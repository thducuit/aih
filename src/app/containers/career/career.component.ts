import { Component, OnInit, OnDestroy } from '@angular/core';
import { Page } from '../../models/page';
import { UrlService } from '../../services/url.service';
import { PageService } from '../../services/page.service';
import { BannerService } from '../../services/banner.service';
import { Meta, Title } from '@angular/platform-browser';
import { forkJoin, Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

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

  constructor(
    public pageService: PageService,
    public bannerService: BannerService,
    private metaService: Meta,
    private titleService: Title,
    private translate: TranslateService) {
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
    this.subscription.unsubscribe();
  }

  loadPage() {
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
      this.titleService.setTitle(`${this.page.name} - ${aihStr}`);
      this.page.metaDesc && this.metaService.addTag({ name: 'description', content: this.page.metaDesc });
      this.metaService.addTag({ name: 'keywords', content: this.page.metaKey });

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
    });
  }

  sliderInit(e) {}

  trackBannersFunc(banner) {
    return banner.Url;
  }
}
