import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import {Insurance} from '../../../models/insurance';
import {Page} from '../../../models/page';
import {forkJoin, Subscription} from 'rxjs';
import {InsuranceService} from '../../../services/insurance.service';
import {InsuranceMediaService} from '../../../services/insurance-media.service';
import {PageService} from '../../../services/page.service';
import {BannerService} from '../../../services/banner.service';
import {TranslateService} from '@ngx-translate/core';
import {Meta, Title} from '@angular/platform-browser';
import {UrlService} from '../../../services/url.service';
import {ActivatedRoute} from '@angular/router';
import {InsuranceDetail} from '../../../models/insurance-detail';
import {NgAnimateScrollService} from 'ng-animate-scroll';
import {LoaderService} from '../../../services/loader-service';
import {environment} from '../../../../environments/environment';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';

@Component({
    selector: 'app-membership-consulting',
    templateUrl: './membership-consulting.component.html',
    styleUrls: ['./membership-consulting.component.scss'],
})
export class MembershipConsultingComponent implements OnInit {

    public insurances: Array<Insurance> = [];
    public page: Page;
    public banners: Array<any> = [];
    public services: Array<any> = [];
    private subscription: Subscription;
    public category;

    constructor(@Inject(DOCUMENT) private document,
                @Inject(PLATFORM_ID) private platformId,
                private route: ActivatedRoute,
                public insuranceService: InsuranceService,
                public insuranceMediaService: InsuranceMediaService,
                public pageService: PageService,
                public bannerService: BannerService,
                private translate: TranslateService,
                private metaService: Meta,
                private titleService: Title,
                private loaderService: LoaderService,
                private animateScrollService: NgAnimateScrollService) {
    }

    ngOnInit() {
        this.loadPage();
        this.route.paramMap.subscribe(params => {
            const id = params.get('id');
            this.loadService(id);
            this.loadCategory(id);
        });
        this.subscription = this.translate.onLangChange.subscribe(() => {
            this.loadPage();
            this.loadService(this.route.snapshot.params.id);
            this.loadCategory(this.route.snapshot.params.id);
        });
    }


    loadPage() {
        this.loaderService.show();
        if (isPlatformBrowser(this.platformId)) {
          window.scroll(0, 0);
        }
        forkJoin(
            this.pageService.fetch('insurancepage'),
            this.translate.get('american_international_hospital'),
        ).subscribe(([data, aihStr]) => {
                const page = data.Post || {};
                this.page = new Page(page);
                // seo
                const pageTitle = `${this.page.name} - ${aihStr}`;
                this.titleService.setTitle(pageTitle);
                this.metaService.updateTag({
                    property: 'og:title',
                    content: pageTitle,
                });
                this.metaService.updateTag({
                    name: 'description',
                    content: this.page.metaDesc,
                });
                this.metaService.updateTag({name: 'keywords', content: this.page.metaKey});
                this.bannerService
                    .fetch('insurancepage', this.page.id)
                    .subscribe((bannerData: any) => {
                        const banners = bannerData.Banner;
                        this.banners = banners.map(banner => {
                            banner.large = UrlService.createMediaUrl(banner.Url);
                            banner.small = banner.large;
                            banner.url = banner.Link;
                            return banner;
                        });
                    });
            },
            null,
            () => {
                this.loaderService.hide();
            });
    }

    loadService(id) {
        this.loaderService.show();
        this.insuranceService.fetchService(id).subscribe((data: any) => {
            const posts = data['Posts'] || [];
            this.services = posts.map(item => {
                const service = new InsuranceDetail(item);
                service.picturePath = UrlService.createPictureUrl(service.picture);
                service.url = UrlService.createMemberDetailUrl(service.alias);
                service.longDesc = UrlService.fixPictureUrl(service.longDesc);
                return service;
            });
            this.loaderService.hide();
        });
    }


    loadCategory(id) {
        this.loaderService.show();
        this.insuranceService.fetchServiceCate().subscribe((data: any) => {
            const categories = data['Categories'] || [];
            this.category = categories.map(item => {
                const insurance = new Insurance(item);
                insurance.picturePath = UrlService.createPictureUrl(insurance.picture, null, 'category');
                insurance.url = UrlService.createInsuranceDetailUrl(insurance.id, insurance.alias);
                return insurance;
            }).find(item => item.id === parseInt(id, 10));

            const pageTitle = this.category.metaTitle || this.category.name;
            this.titleService.setTitle(pageTitle);
            this.metaService.updateTag({
                property: 'og:title',
                content: pageTitle
            });
            this.category.metaDesc && this.metaService.updateTag({name: 'description', content: this.category.metaDesc});
            this.category.metaDesc && this.metaService.updateTag({property: 'og:description', content: this.category.metaDesc});
            this.metaService.updateTag({name: 'keywords', content: this.category.metaKey});
            this.metaService.updateTag({property: 'og:url', content: `${environment.host}${this.category.url}`});

            if (this.category.picture) {
                this.metaService.updateTag({
                    property: 'og:image',
                    content: UrlService.createPictureUrl(this.category.picture, null, 'category')
                });
            }

            this.loaderService.hide();
        });
    }

    openTawk() {
        window['Tawk_API'].maximize();
    }

}
