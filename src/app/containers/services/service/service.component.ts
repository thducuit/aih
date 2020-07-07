import {Component, OnInit, OnDestroy} from '@angular/core';
import {Page} from '../../../models/page';
import {PageService} from '../../../services/page.service';
import {BannerService} from '../../../services/banner.service';
import {UrlService} from '../../../services/url.service';
import {TranslateService} from '@ngx-translate/core';
import {Subscription, forkJoin} from 'rxjs';
import {Meta, Title} from '@angular/platform-browser';
import {LoaderService} from '../../../services/loader-service';
import {environment} from '../../../../environments/environment';
import {Router} from '@angular/router';

@Component({
    selector: 'app-service',
    templateUrl: './service.component.html',
    styleUrls: ['./service.component.scss']
})
export class ServiceComponent implements OnInit, OnDestroy {
    public page: Page;
    public banners: Array<any> = [];
    private subscription: Subscription;

    constructor(public pageService: PageService,
                public bannerService: BannerService,
                private translate: TranslateService,
                private loaderService: LoaderService,
                private metaService: Meta,
                private router: Router,
                private urlService: UrlService,
                private titleService: Title) {
    }

    ngOnInit() {
        this.subscription = this.translate
            .onLangChange
            .subscribe(() => {
                return this.router.navigate([this.urlService.getUrlByKey('mservice')]);
            });
        this.loadPage();
    }

    ngOnDestroy() {
      if (this.subscription) {
        this.subscription.unsubscribe();
      }
    }

    handleLoadCateFinish() {
    }

    loadPage() {
        this.loaderService.show();
        forkJoin(
            this.pageService
                .fetch('servicespage'),
            this.translate.get('american_international_hospital')
        )
            .subscribe(([data, aihStr]) => {
                    const post = data.Post || {};
                    const page = new Page(post);
                    page.longDesc = UrlService.fixPictureUrl(page.longDesc);
                    this.page = page;
                    const pageTitle = `${this.page.metaTitle || this.page.name} - ${aihStr}`;
                    // seo
                    this.titleService.setTitle(pageTitle);
                    this.metaService.updateTag({
                        property: 'og:title',
                        content: pageTitle
                    });
                    this.metaService.updateTag({name: 'description', content: this.page.metaDesc});
                    this.metaService.updateTag({property: 'og:description', content: this.page.metaDesc});
                    this.metaService.updateTag({name: 'keywords', content: this.page.metaKey});
                    this.metaService.updateTag({property: 'og:url', content: `${environment.host}/patient-services/medical-services`});

                    if (this.page.picture) {
                        this.metaService.updateTag({
                            property: 'og:image',
                            content: UrlService.createPictureUrl(this.page.picture),
                        });
                    }
                },
                null,
                () => {
                    this.loaderService.hide();
                });
    }

}
