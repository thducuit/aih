import {Component, OnDestroy, OnInit} from '@angular/core';
import {UrlService} from '../../../services/url.service';
import {CareerCategoryService} from '../../../services/career-category.service';
import {CareerCategory} from '../../../models/career-category';
import {Career} from '../../../models/career';
import {CareerService} from '../../../services/career.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'app-career-section',
    templateUrl: './career-section.component.html',
    styleUrls: ['./career-section.component.scss']
})
export class CareerSectionComponent implements OnInit, OnDestroy {

    public careerCategories: Array<any> = [];
    public careers: Array<any> = [];

    constructor(public careerCategoryService: CareerCategoryService,
                public careerService: CareerService,
                private translate: TranslateService) {
    }

    ngOnInit() {
        this.loadList();
        this.subscription = this
            .translate
            .onLangChange
            .subscribe(() => {
                this.loadList();
            });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    loadList() {
        this.careerCategoryService.fetch().subscribe((data: any) => {
            const categories = data['Categories'] || [];
            const careerCategories = categories.map(item => {
                return new CareerCategory(item);
            }).sort((obj1, obj2) => obj1.sort >= obj2.sort ? 1 : -1);

            // get careers
            this.careerService.fetch().subscribe((data2: any) => {
                const posts = data2['Posts'] || [];
                const careers = posts.map((item) => {
                    const newCareer = new Career(item);
                    newCareer.url = UrlService.createCareerDetailUrl(newCareer.alias);
                    return newCareer;
                }).sort((obj1, obj2) => obj1.sort >= obj2.sort ? 1 : -1);

                this.careerCategories = careerCategories.map(category => {
                    const careerChildren = [];
                    careers.map(career => {
                        if (career.cateId === category.id) {
                            careerChildren.push(career);
                        }
                    });
                    category.careers = careerChildren;
                    return category;
                });
            });
        });
    }
}
