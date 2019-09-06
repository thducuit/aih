import {
    Component,
    OnInit,
    OnDestroy,
    ViewChildren,
    QueryList,
} from '@angular/core';
import {FaqsService} from 'src/app/services/faqs.service';
import {Faq} from 'src/app/models/faq';
import {TranslateService} from '@ngx-translate/core';
import {Subscription, forkJoin} from 'rxjs';
import {FaqItemComponent} from 'src/app/components/faq-item/faq-item.component';
import {Title, Meta} from '@angular/platform-browser';
import {UrlService} from '../../../services/url.service';
import {Page} from '../../../models/page';
import {BannerService} from '../../../services/banner.service';
import {PageService} from '../../../services/page.service';
import {LoaderService} from '../../../services/loader-service';
import {environment} from '../../../../environments/environment';

@Component({
    selector: 'app-qa',
    templateUrl: './qa.component.html',
    styleUrls: ['./qa.component.scss'],
})
export class QaComponent implements OnInit, OnDestroy {
    public currentPage = 1;
    public faqs: any[];
    private subscription: Subscription;
    public page: Page;
    public banners: Array<any> = [];

    @ViewChildren(FaqItemComponent)
    private faqItems: QueryList<FaqItemComponent>;

    constructor(public pageService: PageService,
                public bannerService: BannerService,
                private metaService: Meta,
                private faqsService: FaqsService,
                private translate: TranslateService,
                private loaderService: LoaderService,
                private titleService: Title) {
    }

    ngOnInit() {
        this.loadFaqs();
        this.loadPage();
        this.subscription = this.translate.onLangChange.subscribe(() => {
            this.loadFaqs();
            this.loadPage();
        });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    getLeftColumnItems() {
        const faqs = this.faqs || [];
        const middle = Math.ceil(faqs.length / 2);
        return faqs.slice(0, middle);
    }

    getRightColumnItems() {
        const faqs = this.faqs || [];
        const middle = Math.ceil(faqs.length / 2);
        return faqs.slice(middle);
    }

    loadFaqs() {
        this.loaderService.show();
        this.faqsService.fetch(this.currentPage).subscribe((response: any) => {
            const media = response.Media || [];
            this.faqs = media
                .filter(x => {
                    return x.media_type === 'faqs';
                })
                .map(x => {
                    return new Faq(x);
                });
            this.loaderService.hide();
        });
    }

    closeAllFaq() {
        if (this.faqItems) {
            this.faqItems.forEach(item => {
                item.expanded = false;
            });
        }
    }

    onTryToggleItem(item: FaqItemComponent) {
        if (!item) {
            return;
        }
        if (!item.expanded) {
            this.closeAllFaq();
        }
        item.expanded = !item.expanded;
    }

    loadPage() {
        this.loaderService.show();
        forkJoin(
            this.pageService.fetch('faqspage'),
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
                this.metaService.updateTag({property: 'og:url', content: `${environment.host}/about-us/faq`});

                if (this.page.picture) {
                    this.metaService.updateTag({
                        property: 'og:image',
                        content: UrlService.createPictureUrl(this.page.picture),
                    });
                }

                this.bannerService
                    .fetch('faqspage', this.page.id)
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
