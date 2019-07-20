import { Component, OnInit } from '@angular/core';
import { PageService } from '../../services/page.service';
import { Page } from '../../models/page';
import { UrlService } from '../../services/url.service';
import { BannerService } from '../../services/banner.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public page: Page;
  public banners: any[] = [];
  constructor(
    public pageService: PageService,
    public bannerService: BannerService,
  ) {}

  ngOnInit() {
    this.loadPage();
  }
  loadPage() {
    this.pageService.fetch('homepage').subscribe((homeResp: any) => {
      const page = homeResp.Post || {};
      this.page = new Page(page);
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
