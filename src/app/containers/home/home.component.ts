import { Component, OnInit, OnDestroy } from '@angular/core';
import { PageService } from '../../services/page.service';
import { Page } from '../../models/page';
import { UrlService } from '../../services/url.service';
import { BannerService } from '../../services/banner.service';
import { TranslateService } from '@ngx-translate/core';
import { Subscription, forkJoin } from 'rxjs';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  public page: Page;
  public banners: any[] = [];
  private subscription: Subscription;

  constructor(
    public pageService: PageService,
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
    forkJoin(
      this.pageService
        .fetch('homepage'),
      this.translate.get('american_international_hospital')
    )
      .subscribe(([homeResp, aihStr]) => {
        const page = homeResp.Post || {};
        this.page = new Page(page);
        // seo
        this.titleService.setTitle(`${this.page.name} - ${aihStr}`);
        this.metaService.addTag({ name: 'description', content: this.page.metaDesc });
        this.metaService.addTag({ name: 'keywords', content: this.page.metaKey });

        this.bannerService
          .fetch('homepage', this.page.id)
          .subscribe((bannersResp: any) => {
            const banners = bannersResp.Banner;
            this.banners = banners.map(banner => {
              banner.large = UrlService.createMediaUrl(banner.Url);
              banner.small = banner.large;
              banner.url = banner.Link;
              return banner;
            });
          });
      });
  }
}
