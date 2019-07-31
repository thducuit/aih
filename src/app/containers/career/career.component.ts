import {Component, OnInit} from '@angular/core';
import {Page} from '../../models/page';
import {UrlService} from '../../services/url.service';
import {PageService} from '../../services/page.service';
import {BannerService} from '../../services/banner.service';
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
                private metaService: Meta,
                private titleService: Title) {
    }

    ngOnInit() {
        this.loadPage();
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
}
