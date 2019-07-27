import { Component, OnInit, OnDestroy } from '@angular/core';
import { Page } from '../../../models/page';
import { PageService } from '../../../services/page.service';
import { BannerService } from '../../../services/banner.service';
import { UrlService } from '../../../services/url.service';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit, OnDestroy {
  public page: Page;
  public banners: Array<any> = [];
  private subscription: Subscription;

  constructor(
    public pageService: PageService,
    public bannerService: BannerService,
    private translate: TranslateService
  ) { }

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
      .fetch('aboutus')
      .subscribe((data: any) => {
        const page = data.Post || {};
        this.page = new Page(page);
        this.bannerService.fetch('aboutus', this.page.id).subscribe((bannerData: any) => {
          const banners = bannerData.Banner;
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
