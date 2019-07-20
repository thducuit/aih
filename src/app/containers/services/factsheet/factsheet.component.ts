import { Component, OnInit } from '@angular/core';
import { Page } from '../../../models/page';
import { PageService } from '../../../services/page.service';
import { BannerService } from '../../../services/banner.service';
import { UrlService } from '../../../services/url.service';
import { Highlight } from '../../../models/highlight';
import { HighlightService } from '../../../services/highlight.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-factsheet',
  templateUrl: './factsheet.component.html',
  styleUrls: ['./factsheet.component.scss']
})
export class FactsheetComponent implements OnInit {

  public page: Page;
  public banners: Array<any> = [];
  public highlights: Array<Highlight> = [];
  constructor(
    public pageService: PageService,
    public highlightService: HighlightService,
    public bannerService: BannerService,
    private translate: TranslateService
  ) { }

  ngOnInit() {
    this.loadPage();
    this.loadFactsheets();

    this.translate
      .onLangChange
      .subscribe(() => {
        this.loadPage();
        this.loadFactsheets();
      });
  }
  loadPage() {
    this.pageService.fetch('highlight_page').subscribe((data: any) => {
      const post = data.Post || {};
      const page = new Page(post);
      page.longDesc = UrlService.fixPictureUrl(page.longDesc);
      this.page = page;
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

}
