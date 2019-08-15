import { Component, OnInit, OnDestroy } from '@angular/core';
import { Page } from '../../../models/page';
import { PageService } from '../../../services/page.service';
import { BannerService } from '../../../services/banner.service';
import { UrlService } from '../../../services/url.service';
import { Highlight } from '../../../models/highlight';
import { HighlightService } from '../../../services/highlight.service';
import { TranslateService } from '@ngx-translate/core';
import { Subscription, forkJoin } from 'rxjs';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-factsheet',
  templateUrl: './factsheet.component.html',
  styleUrls: ['./factsheet.component.scss']
})
export class FactsheetComponent implements OnInit, OnDestroy {

  public page: Page;
  public banners: Array<any> = [];
  public banner: any = {};
  public highlights: Array<Highlight> = [];
  private subscription: Subscription;
  public slideConfig = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: false,
    autoplaySpeed: 5000,
    appendDots: '.banner-ser'
  };

  constructor(
    public pageService: PageService,
    public highlightService: HighlightService,
    public bannerService: BannerService,
    private translate: TranslateService,
    private metaService: Meta,
    private titleService: Title) {
  }

  ngOnInit() {
    this.loadPage();
    this.loadFactsheets();

    this.subscription = this.translate
      .onLangChange
      .subscribe(() => {
        this.loadPage();
        this.loadFactsheets();
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  loadPage() {
    forkJoin(
      this.pageService
        .fetch('highlight_page'),
        this.translate.get('american_international_hospital')
    )
      .subscribe(([data, aihStr]) => {
        const post = data.Post || {};
        const page = new Page(post);
        // page.longDesc = UrlService.fixPictureUrl(page.longDesc);
        this.page = page;
        // seo
        const pageTitle = `${this.page.name} - ${aihStr}`;
        this.titleService.setTitle(pageTitle);
        this.metaService.updateTag({
          property: 'og:title',
          content: pageTitle,
        });
        this.metaService.updateTag({ name: 'description', content: this.page.metaDesc });
        this.metaService.updateTag({ name: 'keywords', content: this.page.metaKey });
        this.bannerService
          .fetch('highlight_page', this.page.id)
          .subscribe((bannersResp: any) => {
            const banners = bannersResp.Banner;
            this.banners = banners.map(banner => {
              banner.large = UrlService.createMediaUrl(banner.Url);
              banner.small = banner.large;
              banner.url = banner.Link;
              banner.title = banner.title;
              banner.desc = banner.desc;
              return banner;
            });
            this.banner = this.banners[0];
          });
      });
  }

  loadFactsheets() {
    this.highlightService.fetch().subscribe((data: any) => {
      const posts = data.Media || [];
      this.highlights = posts.map(post => {
        const highlight = new Highlight(post);
        highlight.thumb = UrlService.createMediaUrl(highlight.thumb);
        return highlight;
      });
    });
  }

  trackBannerItem(banner: any) {
    return banner.large;
  }

  sliderInit(e) {}
}
