import {Component, OnInit, OnDestroy} from '@angular/core';
import {Page} from '../../models/page';
import {UrlService} from '../../services/url.service';
import {PageService} from '../../services/page.service';
import {BannerService} from '../../services/banner.service';
import {Meta, Title} from '@angular/platform-browser';
import {forkJoin, Subscription} from 'rxjs';
import {TranslateService} from '@ngx-translate/core';
import {NgAnimateScrollService} from 'ng-animate-scroll';
import {ScrollToService, ScrollToConfigOptions} from '@nicky-lenaers/ngx-scroll-to';
import {LoaderService} from '../../services/loader-service';
import {environment} from '../../../environments/environment';

@Component({
    selector: 'app-career',
    templateUrl: './career.component.html',
    styleUrls: ['./career.component.scss']
})
export class CareerComponent implements OnInit, OnDestroy {

    public page: Page;
    public banners: Array<any> = [];
    public careerCategories: Array<any> = [];
    public careers: Array<any> = [];
    private subscription: Subscription;
    public slideConfig = {
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        autoplay: false,
        autoplaySpeed: 5000,
        appendDots: '.banner-careers'
    };

    constructor(public pageService: PageService,
                public bannerService: BannerService,
                private metaService: Meta,
                private titleService: Title,
                private translate: TranslateService,
                private loaderService: LoaderService,
                private animateScrollService: NgAnimateScrollService,
                private scrollToService: ScrollToService) {
    }

    ngOnInit() {
        this.loadPage();
        this.subscription = this
            .translate
            .onLangChange
            .subscribe(() => {
                this.loadPage();
            });
    }

    ngOnDestroy() {
      if (this.subscription) {
        this.subscription.unsubscribe();
      }
    }

    loadPage() {
        this.loaderService.show();
        forkJoin(
            this.pageService.fetch('careerpage'),
            this.translate.get('american_international_hospital')
        ).subscribe(([data, aihStr]) => {
                const post = data.Post || {};
                const page = new Page(post);
                page.longDesc = UrlService.fixPictureUrl(page.longDesc);
                page.picturePath = UrlService.createPictureUrl(page.picture);
                this.page = page;
                // seo
                const pageTitle = `${this.page.metaTitle || this.page.name} - ${aihStr}`;
                this.titleService.setTitle(pageTitle);
                this.metaService.updateTag({
                    property: 'og:title',
                    content: pageTitle,
                });
                this.page.metaDesc && this.metaService.updateTag({name: 'description', content: this.page.metaDesc});
                this.page.metaDesc && this.metaService.updateTag({property: 'og:description', content: this.page.metaDesc});
                this.metaService.updateTag({name: 'keywords', content: this.page.metaKey});
                this.metaService.updateTag({property: 'og:url', content: `${environment.host}/career`});

                if (this.page.picture) {
                    this.metaService.updateTag({
                        property: 'og:image',
                        content: UrlService.createPictureUrl(this.page.picture)
                    });
                }

                this.bannerService
                    .fetch('careerpage', this.page.id)
                    .subscribe((bannersResp: any) => {
                        const banners = bannersResp.Banner;
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

    sliderInit(e) {
    }

    trackBannersFunc(banner) {
        return banner.Url;
    }

    scrollToForm() {
        // this.animateScrollService.scrollToElement('careerForm', 150)
        const config: ScrollToConfigOptions = {
            target: 'career-form',
            offset: 500
        };

        this.scrollToService.scrollTo(config);
    }
}
