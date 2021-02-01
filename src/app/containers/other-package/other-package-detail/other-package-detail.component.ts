import {Component, Inject, OnDestroy, OnInit, PLATFORM_ID} from '@angular/core';
import {Page} from '../../../models/page';
import {forkJoin, Subscription} from 'rxjs';
import {PageService} from '../../../services/page.service';
import {BannerService} from '../../../services/banner.service';
import {TranslateService} from '@ngx-translate/core';
import {Meta, Title} from '@angular/platform-browser';
import {UrlService} from '../../../services/url.service';
import {PostService} from '../../../services/post.service';
import {ActivatedRoute, Router} from '@angular/router';
import {NgAnimateScrollService} from 'ng-animate-scroll';
import {environment} from '../../../../environments/environment';
import {LoaderService} from '../../../services/loader-service';
import {DOCUMENT, isPlatformBrowser} from '@angular/common';
import {Blog} from '../../../models/blog';
import {OtherpackageService} from '../../../services/otherpackage.service';

@Component({
    selector: 'app-other-package-detail',
    templateUrl: './other-package-detail.component.html',
    styleUrls: ['./other-package-detail.component.scss'],
})
export class OtherPackageDetailComponent implements OnInit, OnDestroy {

    public page: Page;
    public banners: Array<any> = [];
    private subscription: Subscription;
    public post;
    public posts;
    public longDescs;
    public category;
    private id;

    constructor(@Inject(DOCUMENT) private document,
                @Inject(PLATFORM_ID) private platformId,
                private route: ActivatedRoute,
                public otherpackageService: OtherpackageService,
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
            this.postService.getAlias(alias).subscribe((data2: any) => {
                const newAlias = data2['alias'];
                if (newAlias) {
                    return this.router.navigate([
                        this.urlService.createOtherPackageDetail(newAlias),
                    ]);
                } else {
                    return this.router.navigate([this.urlService.getUrlByKey('opackage')]);
                }
            });
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
                this.metaService.updateTag({name: 'keywords', content: this.page.metaKey});
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

    private loadPosts(alias: string) {
        this.loaderService.show();
        forkJoin(
            this.postService.fetch(alias),
            this.translate.get('american_international_hospital'),
        ).subscribe(([data, aihStr]) => {
                const post = new Blog(data['Post']);
                if (post.picture) {
                    post.picturePath = UrlService.createPictureUrl(post.picture);
                }
                post.longDesc = UrlService.fixPictureUrl(post.longDesc);

                this.post = post;

                this.loadMorePosts(post.id);

                // seo
                const pageTitle = `${this.post.metaTitle || this.post.name} - ${aihStr}`;
                this.titleService.setTitle(pageTitle);
                this.metaService.updateTag({
                    property: 'og:title',
                    content: pageTitle,
                });
                this.metaService.updateTag({
                    name: 'description',
                    content: this.post.metaDesc,
                });
                this.metaService.updateTag({
                    name: 'keywords',
                    content: this.post.metaKey,
                });
                this.metaService.updateTag({
                    property: 'og:description',
                    content: this.post.metaDesc,
                });
                this.metaService.updateTag({
                    property: 'og:url',
                    content: post.url,
                });
                this.metaService.updateTag({
                    property: 'og:image',
                    content: post.picturePath,
                });
            },
            null,
            () => {
                this.loaderService.hide();
            });
    }

    loadMorePosts(exceptId) {
        this.loaderService.show();
        this.otherpackageService.fetchService().subscribe((data: any) => {
            const posts = data['Posts'] || [];
            this.posts = posts.map(item => {
                const post = new Blog(item);
                post.picturePath = UrlService.createPictureUrl(post.picture);
                post.url = this.urlService.createOtherPackageDetail(post.alias);
                return post;
            }).filter(item => exceptId !== item.id);
            this.loaderService.hide();
        });
    }

}
