import { Component, OnInit } from '@angular/core';
import {Page} from "../../models/page";
import {PageService} from "../../services/page.service";
import {BannerService} from "../../services/banner.service";
import {UrlService} from "../../services/url.service";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  public page: Page;
  public banners: Array<any> = [];
  constructor(public pageService: PageService,
              public bannerService: BannerService) { }

  ngOnInit() {
    this.loadPage();
  }

  loadPage() {
    this.pageService.fetch('contact_page').subscribe((data: any) => {
      const post = data.Post || {};
      const page = new Page(post);
      page.longDesc = UrlService.fixPictureUrl(page.longDesc);
      page.picturePath = UrlService.createPictureUrl(page.picture);
      this.page = page;

      this.bannerService
        .fetch('contact_page', this.page.id)
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

}
