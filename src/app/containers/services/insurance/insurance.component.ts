import {Component, OnInit} from '@angular/core';
import {Insurance} from '../../../models/insurance';
import {InsuranceService} from '../../../services/insurance.service';
import {UrlService} from '../../../services/url.service';
import {TranslateService} from '@ngx-translate/core';
import {InsuranceMediaService} from '../../../services/insurance-media';
import {InsuranceMedia} from '../../../models/insurance-media';
import {Page} from '../../../models/page';
import {PageService} from '../../../services/page.service';
import {BannerService} from '../../../services/banner.service';

@Component({
    selector: 'app-insurance',
    templateUrl: './insurance.component.html',
    styleUrls: ['./insurance.component.scss']
})
export class InsuranceComponent implements OnInit {

    public insurances: Array<Insurance> = [];
    public page: Page;
    public banners: Array<any> = [];

    constructor(public insuranceService: InsuranceService,
                public insuranceMediaService: InsuranceMediaService,
                public pageService: PageService,
                public bannerService: BannerService,
                private translate: TranslateService) {
    }

    ngOnInit() {
        this.loadInsurances();
        this.loadPage();
        this.translate
            .onLangChange
            .subscribe(() => {
                this.loadInsurances();
            });
    }

    loadPage() {
        this.pageService
            .fetch('insurancepage')
            .subscribe((data: any) => {
                const page = data.Post || {};
                this.page = new Page(page);
                this.bannerService.fetch('insurancepage', this.page.id).subscribe((bannerData: any) => {
                    const banners = bannerData.Banner;
                    this.banners = banners.map(banner => {
                        banner.large = UrlService.createMediaUrl(banner.Url);
                        banner.small = banner.large;
                        banner.url = banner.Link;
                        return banner;
                    });
                });
            });
    }

    loadInsurances() {
        this.insuranceService
            .fetch()
            .subscribe((data: {}) => {
                const posts = data['Categories'] || [];
                const insurances = posts.map(post => {
                    return new Insurance(post);
                }).sort((obj1, obj2) => obj1.sort >= obj2.sort ? 1 : -1);

                this.insuranceMediaService.fetch().subscribe((dataMedia: {}) => {
                    const mediaCats = dataMedia['Media'] || [];
                    const medias = mediaCats.map(media => {
                        const newMedia = new InsuranceMedia(media);
                        newMedia.thumb = UrlService.createMediaUrl(newMedia.thumb);
                        return newMedia;
                    }).sort((obj1, obj2) => obj1.sort >= obj2.sort ? 1 : -1);

                    insurances.map(insurance => {
                        const children = [];
                        medias.map(media => {
                            if (insurance.id === media.cateid) {
                                children.push(media);
                            }
                        });
                        insurance.media = children;
                    });

                    this.insurances = insurances.filter(insurance => insurance.parentId === 0);
                    this.insurances = this.insurances.map(insurance => {
                        const children = [];
                        insurances.map(insuranceChild => {
                            if (insuranceChild.parentId === insurance.id) {
                                children.push(insuranceChild);
                            }
                        });
                        insurance.children = children;
                        return insurance;
                    });
                    console.log('this.insurances', this.insurances);
                });
            });
    }
}
