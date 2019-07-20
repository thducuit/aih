import { Component, OnInit } from '@angular/core';
import { Page } from '../../../models/page';
import { PageService } from '../../../services/page.service';
import { BannerService } from '../../../services/banner.service';
import { UrlService } from '../../../services/url.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.scss']
})
export class ServiceComponent implements OnInit {

  public page: Page;
  public banners: Array<any> = [];
  constructor(
    public pageService: PageService,
    public bannerService: BannerService,
    private translate: TranslateService
  ) { }

  ngOnInit() {
    this.loadPage();
    this.translate
      .onLangChange
      .subscribe(() => {
        this.loadPage();
      });
  }
  loadPage() {
    this.pageService
      .fetch('servicespage')
      .subscribe((data: any) => {
        const post = data.Post || {};
        const page = new Page(post);
        page.longDesc = UrlService.fixPictureUrl(page.longDesc);
        this.page = page;
      });
  }

}
