import { Component, OnInit } from '@angular/core';
import { PageService } from '../../services/page.service';
import { BannerService } from '../../services/banner.service';
import { UrlService } from '../../services/url.service';
import { Page } from '../../models/page';
import {PackageService} from '../../services/package.service';

@Component({
  selector: 'app-medical',
  templateUrl: './medical.component.html',
  styleUrls: ['./medical.component.scss']
})
export class MedicalComponent implements OnInit {

  public page: Page;
  public banners: Array<any> = [];
  constructor(public pageService: PageService,
              public bannerService: BannerService,
              public packageService: PackageService) { }

  ngOnInit() {
    this.loadPage();
    this.loadPackages();
  }

  loadPage() {
    this.pageService.fetch('packagepage').subscribe((data: any) => {
      const post = data.Post || {};
      const page = new Page(post);
      page.longDesc = UrlService.fixPictureUrl(page.longDesc);
      this.page = page;
      this.bannerService
        .fetch('packagepage', this.page.id)
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
        });
    });
  }

  loadPackages() {
    this.packageService.fetchService().subscribe((data: {}) => {
      const posts = data['Categories'] || [];
      console.log(posts);
    });
  }

}
