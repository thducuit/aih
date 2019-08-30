import { Component, OnInit, OnDestroy } from '@angular/core';
import { PageService } from '../../services/page.service';
import { Page } from '../../models/page';
import { UrlService } from '../../services/url.service';
import { BannerService } from '../../services/banner.service';
import { TranslateService } from '@ngx-translate/core';
import { Subscription, forkJoin } from 'rxjs';
import { Meta, Title } from '@angular/platform-browser';
import { LoaderService } from 'src/app/services/loader-service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  public page: Page;
  public banners: any[] = [];
  private subscription: Subscription;
  public pageClasses: string[];

  constructor(
    public pageService: PageService,
    public bannerService: BannerService,
    private translate: TranslateService,
    private loaderService: LoaderService,
    private metaService: Meta,
    private titleService: Title,
  ) {
    this.pageClasses = this.getPageClasses();
  }

  ngOnInit() {
    this.loadPage();
    this.subscription = this.translate.onLangChange.subscribe(() => {
      this.loadPage();
      this.pageClasses = this.getPageClasses();
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getPageClasses() {
    const originalLang = this.translate.currentLang;
    const languageClass = originalLang === 'vi' ? 'vn' : originalLang;
    return [languageClass, 'window'];
  }

  loadPage() {
    this.loaderService.show();
    forkJoin(
      this.pageService.fetch('homepage'),
      this.translate.get('american_international_hospital'),
    ).subscribe(
      ([homeResp, aihStr]) => {
        const page = homeResp.Post || {};
        this.page = new Page(page);
        const pageTitle = `${this.page.name} - ${aihStr}`;
        // seo
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
          name: 'keywords',
          content: this.page.metaKey,
        });

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
      },
      null,
      () => {
        this.loaderService.hide();
      },
    );
  }
}
