import { Component, OnInit } from '@angular/core';
import {Page} from "../../../models/page";
import {PageService} from "../../../services/page.service";
import {BannerService} from "../../../services/banner.service";
import {UrlService} from "../../../services/url.service";

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.scss']
})
export class ServiceComponent implements OnInit {

  public page: Page;
  public banners: Array<any> = [];
  constructor(public pageService: PageService,
              public bannerService: BannerService) { }

  ngOnInit() {
    this.loadPage();
  }
  loadPage() {
    this.pageService.fetch('servicespage').subscribe( (data: any) => {
      const post = data.Post || {};
      const page = new Page(post);
      page.longDesc = UrlService.fixPictureUrl(page.longDesc);
      this.page = page;
    });
  }

}
