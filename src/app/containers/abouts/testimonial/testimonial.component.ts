import {Component, OnInit, OnDestroy} from '@angular/core';
import {TestimonialService} from 'src/app/services/testimonial.service';
import {Testimonial} from 'src/app/models/testimonial';
import {TranslateService} from '@ngx-translate/core';
import {Subscription, forkJoin} from 'rxjs';
import {Title, Meta} from '@angular/platform-browser';
import {UrlService} from '../../../services/url.service';
import {Page} from '../../../models/page';
import {BannerService} from '../../../services/banner.service';
import {PageService} from '../../../services/page.service';
import {LoaderService} from '../../../services/loader-service';
import {environment} from '../../../../environments/environment';

@Component({
    selector: 'app-testimonial',
    templateUrl: './testimonial.component.html',
    styleUrls: ['./testimonial.component.scss'],
})
export class TestimonialComponent implements OnInit, OnDestroy {
    public currentPage = 1;
    public testimonials: any[];
    private subcription: Subscription;
    public page: Page;
    public banners: Array<any> = [];

    constructor(private testimonialService: TestimonialService,
                private translate: TranslateService,
                private titleService: Title,
                public pageService: PageService,
                public bannerService: BannerService,
                private loaderService: LoaderService,
                private metaService: Meta) {
    }

    ngOnInit() {
        this.loadTestimonials();
        this.loadPage();
        this.subcription = this.translate
            .onLangChange
            .subscribe(() => {
                this.loadPage();
                this.loadTestimonials();
            });
    }

    ngOnDestroy() {
        this.subcription.unsubscribe();
    }

    loadTestimonials() {
        this.loaderService.show();
        this.testimonialService
            .fetch(this.currentPage)
            .subscribe((response: any) => {
                this.testimonials = (response.Media || [])
                    .map((x: any) => {
                        return new Testimonial(x);
                    });
                this.loaderService.hide();
            });
    }

    loadPage() {
        this.loaderService.show();
        forkJoin(
            this.pageService.fetch('customer_feedbackpage'),
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
                this.metaService.updateTag({property: 'og:url', content: `${environment.host}/about-us/testimonial`});

                if (this.page.picture) {
                    this.metaService.updateTag({
                        property: 'og:image',
                        content: UrlService.createPictureUrl(this.page.picture),
                    });
                }

                this.bannerService
                    .fetch('customer_feedbackpage', this.page.id)
                    .subscribe((bannersResp: any) => {
                        const banners = bannersResp.Banner;
                        this.banners = banners.map(banner => {
                            banner.large = UrlService.createMediaUrl(banner.Url);
                            banner.small = banner.large;
                            banner.url = banner.Link;
                            banner.content = banner.Content;
                            banner.title = banner.Title;
                            return banner;
                        });
                    });
            },
            null,
            () => {
                this.loaderService.hide();
            });
    }
}
