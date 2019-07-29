import {Component, OnInit} from '@angular/core';
import {Page} from '../../models/page';
import {UrlService} from '../../services/url.service';
import {PageService} from '../../services/page.service';
import {BannerService} from '../../services/banner.service';
import {CareerCategoryService} from '../../services/career-category.service';
import {CareerCategory} from '../../models/career-category';
import {Career} from '../../models/career';
import {CareerService} from '../../services/career.service';
import {Meta, Title} from '@angular/platform-browser';

@Component({
    selector: 'app-career',
    templateUrl: './career.component.html',
    styleUrls: ['./career.component.scss']
})
export class CareerComponent implements OnInit {

    public page: Page;
    public banners: Array<any> = [];
    public careerCategories: Array<any> = [];
    public careers: Array<any> = [];

    constructor(public pageService: PageService,
                public bannerService: BannerService,
                public careerCategoryService: CareerCategoryService,
                public careerService: CareerService,
                private metaService: Meta,
                private titleService: Title) {
    }

    ngOnInit() {
        this.loadPage();
        this.loadList();
    }

    loadPage() {
        this.pageService.fetch('careerpage').subscribe((data: any) => {
            const post = data.Post || {};
            const page = new Page(post);
            page.longDesc = UrlService.fixPictureUrl(page.longDesc);
            page.picturePath = UrlService.createPictureUrl(page.picture);
            this.page = page;
            // seo
            this.titleService.setTitle(this.page.metaTitle);
            this.metaService.addTag({name: 'description', content: this.page.metaDesc});
            this.metaService.addTag({name: 'keywords', content: this.page.metaKey});

            this.bannerService
                .fetch('careerpage', this.page.id)
                .subscribe((bannersResp: any) => {
                    const banners = bannersResp.Banner;
                    this.banners = banners.map(banner => {
                        banner.large = UrlService.createMediaUrl(banner.Url);
                        banner.small = banner.large;
                        banner.url = banner.Link;
                        banner.title = banner.title;
                        banner.desc = banner.desc;
                        return banner;
                    });
                });
        });
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
