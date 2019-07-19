import { Component, OnInit } from '@angular/core';
import {Page} from "../../../models/page";
import {PageService} from "../../../services/page.service";
import {BannerService} from "../../../services/banner.service";
import {UrlService} from "../../../services/url.service";

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  public page: Page;
  public banners: Array<any> = [];
  constructor(public pageService: PageService,
              public bannerService: BannerService) { }

  ngOnInit() {
    this.loadPage();
  }
  loadPage() {
    this.pageService.fetch('aboutus').subscribe( (data: any) => {
      const page = data.Post || {};
      this.page = new Page(page);
      this.bannerService.fetch('aboutus', this.page.id).subscribe( (data: any) =>  {
        const banners = data['Banner'];
        this.banners = banners.map( banner => {
          banner.large = UrlService.createMediaUrl(banner.Url);
          banner.small = banner.large;
          banner.url = banner.Link;
          return banner;
        });
        console.log('about', this.banners, this.page);
      });
    });
  }

}
