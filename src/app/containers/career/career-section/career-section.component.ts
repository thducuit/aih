import {Component, OnDestroy, OnInit} from '@angular/core';
import {UrlService} from '../../../services/url.service';
import {CareerCategoryService} from '../../../services/career-category.service';
import {CareerCategory} from '../../../models/career-category';
import {Career} from '../../../models/career';
import {CareerService} from '../../../services/career.service';
import {TranslateService} from '@ngx-translate/core';
import {Subscription} from 'rxjs';
import {LoaderService} from '../../../services/loader-service';

@Component({
    selector: 'app-career-section',
    templateUrl: './career-section.component.html',
    styleUrls: ['./career-section.component.scss'],
})
export class CareerSectionComponent implements OnInit, OnDestroy {

    public careerCategories: Array<any> = [];
    public careers: Array<any> = [];
    private subscription: Subscription;
    private perPage = 2;

    constructor(public careerCategoryService: CareerCategoryService,
                public careerService: CareerService,
                private loaderService: LoaderService,
                private translate: TranslateService) {
    }

    ngOnInit() {
        this.loadList();
        this.subscription = this.translate.onLangChange.subscribe(() => {
            this.loadList();
        });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    loadList() {
        this.loaderService.show();
        this.careerCategoryService.fetch().subscribe((data: any) => {
            const categories = data['Categories'] || [];
            const careerCategories = categories
                .map(item => {
                    return new CareerCategory(item);
                })
                .sort((obj1, obj2) => (obj1.sort >= obj2.sort ? 1 : -1));

            // get careers
            this.careerService.fetch().subscribe((data2: any) => {
                const posts = data2['Posts'] || [];
                const careers = posts
                    .map(item => {
                        const newCareer = new Career(item);
                        newCareer.url = UrlService.createCareerDetailUrl(newCareer.alias);
                        return newCareer;
                    });

                this.careerCategories = careerCategories.map(category => {
                    const careerChildren = [];
                    careers.map(career => {
                        if (career.cateId === category.id) {
                            careerChildren.push(career);
                        }
                    });

                    category.careers = careerChildren;
                    category.currentPage = 1;
                    const pages = Math.ceil(careerChildren.length / this.perPage);
                    category.pages = [];
                    for (let i = 1; i <= pages; i++) {
                        category.pages.push(i);
                    }
                    const start = (category.currentPage - 1) * this.perPage;
                    category.filterCareers = category.careers.slice(start, start + this.perPage);

                    return category;
                });
                this.loaderService.hide();
            });
        });
    }

    currPage(careerCategory, page) {
        careerCategory.currentPage = page;
        const start = (careerCategory.currentPage - 1) * this.perPage;
        careerCategory.filterCareers = careerCategory.careers.slice(start, start + this.perPage);
    }

    nextPage(careerCategory) {
        careerCategory.currentPage += 1;
        const start = (careerCategory.currentPage - 1) * this.perPage;
        careerCategory.filterCareers = careerCategory.careers.slice(start, start + this.perPage);
    }

    prevPage(careerCategory) {
        careerCategory.currentPage -= 1;
        const start = (careerCategory.currentPage - 1) * this.perPage;
        careerCategory.filterCareers = careerCategory.careers.slice(start, start + this.perPage);
    }
}
