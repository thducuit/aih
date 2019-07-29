import {Component, OnInit, OnDestroy} from '@angular/core';
import {Page} from '../../../models/page';
import {PageService} from '../../../services/page.service';
import {BannerService} from '../../../services/banner.service';
import {UrlService} from '../../../services/url.service';
import {TranslateService} from '@ngx-translate/core';
import {Subscription} from 'rxjs';
import {Meta, Title} from '@angular/platform-browser';

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
                private metaService: Meta,
                private titleService: Title) {
    }

    ngOnInit() {
        this.loadPage();
        this.subscription = this.translate
            .onLangChange
            .subscribe(() => {
                this.loadPage();
            });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    loadPage() {
        this.pageService
            .fetch('servicespage')
            .subscribe((data: any) => {
                const post = data.Post || {};
                const page = new Page(post);
                page.longDesc = UrlService.fixPictureUrl(page.longDesc);
                this.page = page;
                // seo
                this.titleService.setTitle(this.page.metaTitle);
                this.metaService.addTag({name: 'description', content: this.page.metaDesc});
                this.metaService.addTag({name: 'keywords', content: this.page.metaKey});
            });
    }

}
