import {Component, Inject, OnDestroy, OnInit, PLATFORM_ID} from '@angular/core';
import {forkJoin, Subscription} from 'rxjs';
import {Page} from '../../models/page';
import {UrlService} from '../../services/url.service';
import {Insurance} from '../../models/insurance';
import {InsuranceService} from '../../services/insurance.service';
import {InsuranceMediaService} from '../../services/insurance-media.service';
import {PageService} from '../../services/page.service';
import {BannerService} from '../../services/banner.service';
import {TranslateService} from '@ngx-translate/core';
import {Meta, Title} from '@angular/platform-browser';
import {LoaderService} from '../../services/loader-service';
import {environment} from '../../../environments/environment';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import {Router} from '@angular/router';
import {OtherpackageService} from '../../services/otherpackage.service';
import {Blog} from '../../models/blog';

@Component({
    selector: 'app-other-package',
    templateUrl: './other-package.component.html',
    styleUrls: ['./other-package.component.scss'],
})
export class OtherPackageComponent implements OnInit, OnDestroy {

    public page: Page;
    public banners: Array<any> = [];
    public categories: Array<any> = [];
    private subscription: Subscription;
    public posts: Array<any> = [];

    constructor(
        @Inject(DOCUMENT) private document,
        @Inject(PLATFORM_ID) private platformId,
        public otherpackageService: OtherpackageService,
        public pageService: PageService,
        public bannerService: BannerService,
        private translate: TranslateService,
        private urlService: UrlService,
        private metaService: Meta,
        private titleService: Title,
        private router: Router,
        private loaderService: LoaderService) {
    }

    ngOnInit() {
        this.subscription = this.translate.onLangChange.subscribe(() => {
            return this.router.navigate([this.urlService.getUrlByKey('opackage')]);
        });
        this.loadPage();
        this.loadCategory();
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
            this.pageService.fetch('otherpackagepage'),
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
                this.metaService.updateTag({
                    name: 'keywords',
                    content: this.page.metaKey,
                });

                this.metaService.updateTag({property: 'og:url', content: `${environment.host}/insurance-membership`});

                if (this.page.picture) {
                    this.metaService.updateTag({
                        property: 'og:image',
                        content: UrlService.createPictureUrl(this.page.picture),
                    });
                }

                this.bannerService
                    .fetch('otherpackagepage', this.page.id)
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

    loadCategory() {
        this.loaderService.show();
        this.otherpackageService.fetchService().subscribe((data: any) => {
            const posts = data['Posts'] || [];
            this.posts = posts
                .map(item => {
                    const post = new Blog(item);
                    post.picturePath = UrlService.createPictureUrl(
                        post.picture,
                        null,
                        'post',
                    );
                    post.url = this.urlService.createOtherPackageDetail(post.alias);
                    post.showImg = true;
                    return post;
                });
            this.loaderService.hide();
        });
    }
}
