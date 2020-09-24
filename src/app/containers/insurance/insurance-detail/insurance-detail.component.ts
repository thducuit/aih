import {Component, Inject, OnDestroy, OnInit, PLATFORM_ID} from '@angular/core';
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
import {InsuranceDetail} from '../../../models/insurance-detail';
import {PostService} from '../../../services/post.service';
import {ActivatedRoute, Router} from '@angular/router';
import {NgAnimateScrollService} from 'ng-animate-scroll';
import {environment} from '../../../../environments/environment';
import {LoaderService} from '../../../services/loader-service';
import {DOCUMENT, isPlatformBrowser} from '@angular/common';

@Component({
    selector: 'app-insurance-detail',
    templateUrl: './insurance-detail.component.html',
    styleUrls: ['./insurance-detail.component.scss'],
})
export class InsuranceDetailComponent implements OnInit, OnDestroy {

    public insurances: Array<Insurance> = [];
    public page: Page;
    public banners: Array<any> = [];
    private subscription: Subscription;
    public service;
    public services;
    public longDescs;
    public category;
    private id;

    constructor(@Inject(DOCUMENT) private document,
                @Inject(PLATFORM_ID) private platformId,
                private route: ActivatedRoute,
                public insuranceService: InsuranceService,
                public insuranceMediaService: InsuranceMediaService,
                private animateScrollService: NgAnimateScrollService,
                public pageService: PageService,
                public bannerService: BannerService,
                private translate: TranslateService,
                private metaService: Meta,
                private titleService: Title,
                private loaderService: LoaderService,
                private urlService: UrlService,
                private router: Router,
                public postService: PostService) {
    }

    ngOnInit() {
        this.loadPage();
        this.route.paramMap.subscribe(params => {
            const alias = params.get('alias');
            this.id = params.get('id');
            this.loadPage();
            this.loadPosts(alias);
        });
        this.subscription = this.translate.onLangChange.subscribe(() => {
            const alias = this.route.snapshot.params.alias;
            const id = this.route.snapshot.params.id;
            this.postService.getAlias(id).subscribe((data: any) => {
                this.id = data['alias'];
                if (this.id) {
                    this.postService.getAlias(alias).subscribe((data2: any) => {
                        const newAlias = data2['alias'];
                        if (newAlias) {
                            return this.router.navigate([
                                this.urlService.createInsuranceDetailUrl(this.id, newAlias),
                            ]);
                        } else {
                            return this.router.navigate([this.urlService.getUrlByKey('insmem')]);
                        }
                    });
                } else {
                    return this.router.navigate([this.urlService.getUrlByKey('insmem')]);
                }
            });
            // this.loadPage();
            // this.loadPosts(this.route.snapshot.params.alias);
        });
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
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
                this.metaService.updateTag({
                    property: 'og:description',
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

    private loadPosts(alias: string) {
        this.loaderService.show();
        forkJoin(
            this.postService.fetch(alias),
            this.translate.get('american_international_hospital'),
        ).subscribe(([data, aihStr]) => {
                const service = new InsuranceDetail(data['Post']);
                if (service.picture) {
                    service.picturePath = UrlService.createPictureUrl(service.picture);
                }
                service.longDesc = UrlService.fixPictureUrl(service.longDesc);
                const longDescs = service.longDesc.split('[direct_billing_partners][/direct_billing_partners]');

                this.longDescs = longDescs
                    .filter(item => item)
                    .map(item => {
                        return {
                            content: item,
                            haveHook: true,
                        };
                    });

                if (!service.longDesc.endsWith('[direct_billing_partners][/direct_billing_partners]')) {
                    this.longDescs[this.longDescs.length - 1]['haveHook'] = false;
                }


                this.service = service;

                this.loadCategory(service.categoryId);

                this.loadService(service.categoryId, service.id);

                // seo
                const pageTitle = `${this.service.metaTitle || this.service.name} - ${aihStr}`;
                this.titleService.setTitle(pageTitle);
                this.metaService.updateTag({
                    property: 'og:title',
                    content: pageTitle,
                });
                this.metaService.updateTag({
                    name: 'description',
                    content: this.service.metaDesc,
                });
                this.metaService.updateTag({
                    name: 'keywords',
                    content: this.service.metaKey,
                });
                this.metaService.updateTag({
                    property: 'og:description',
                    content: this.service.metaDesc,
                });
                this.metaService.updateTag({
                    property: 'og:url',
                    content: service.url,
                });
                this.metaService.updateTag({
                    property: 'og:image',
                    content: service.picturePath,
                });
            },
            null,
            () => {
                this.loaderService.hide();
            });
    }

    loadService(id, exceptId) {
        this.loaderService.show();
        this.insuranceService.fetchService(id).subscribe((data: any) => {
            const posts = data['Posts'] || [];
            this.services = posts.map(item => {
                const service = new InsuranceDetail(item);
                service.picturePath = UrlService.createPictureUrl(service.picture);
                service.url = this.urlService.createInsuranceDetailUrl(this.id, service.alias);
                return service;
            }).filter(item => exceptId !== item.id);
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
                insurance.url = this.urlService.createConsultingUrl(insurance);
                return insurance;
            }).find(item => item.id === parseInt(id, 10));
            this.loaderService.hide();
        });
    }

    openTawk() {
        window['Tawk_API'].maximize();
    }

}
