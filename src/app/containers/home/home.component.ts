import { Component, OnInit, OnDestroy } from '@angular/core';
import { PageService } from '../../services/page.service';
import { Page } from '../../models/page';
import { UrlService } from '../../services/url.service';
import { BannerService } from '../../services/banner.service';
import { TranslateService } from '@ngx-translate/core';
import { Subscription, forkJoin, Subject } from 'rxjs';
import { Meta, Title } from '@angular/platform-browser';
import { LoaderService } from 'src/app/services/loader-service';
import { environment } from '../../../environments/environment';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  public page: Page;
  public banners: any[] = [];
  private subscription: Subscription;
  public pageClasses: string[];

  private loadPageSubject = new Subject();
  private loadPageDebounceSub = this.loadPageSubject
    .pipe(debounceTime(150))
    .subscribe(() => {
      this.loadPage();
    });

  constructor(
    public pageService: PageService,
    public bannerService: BannerService,
    private translate: TranslateService,
    private loaderService: LoaderService,
    private metaService: Meta,
    private titleService: Title,
  ) {
    this.pageClasses = this.getPageClasses();
  }

  ngOnInit() {
    this.subscription = this.translate.onLangChange.subscribe(() => {
      this.loadPageSubject.next();
      this.pageClasses = this.getPageClasses();
    });
    this.loadPageSubject.next();
  }

  ngOnDestroy() {
    this.subscription && this.subscription.unsubscribe();
    this.loadPageDebounceSub && this.loadPageDebounceSub.unsubscribe();
  }

  getPageClasses() {
    const originalLang = this.translate.currentLang;
    const languageClass = originalLang === 'vi' ? 'vn' : originalLang;
    return [languageClass, 'window'];
  }

  loadPage() {
    this.loaderService.show();
    forkJoin(
      this.pageService.fetch('homepage'),
      this.translate.get('american_international_hospital'),
      this.pageService.fetchBanner('home_slide'),
    ).subscribe({
      next: ([homeResp, aihStr, pageBanners]) => {
        const page = homeResp.Post || {};
        this.page = new Page(page);
        const pageTitle = `${this.page.metaTitle ||
          this.page.name} - ${aihStr}`;
        // seo
        this.titleService.setTitle(pageTitle);
        this.metaService.updateTag({
          property: 'og:title',
          content: pageTitle,
        });
        this.metaService.updateTag({
          name: 'description',
          content: this.page.metaDesc,
        });
        this.metaService.updateTag({
          property: 'og:description',
          content: this.page.metaDesc,
        });
        this.metaService.updateTag({
          name: 'keywords',
          content: this.page.metaKey,
        });

        this.metaService.updateTag({
          name: 'og:url',
          property: `${environment.host}/`,
        });

        if (this.page.picture) {
          this.metaService.updateTag({
            property: 'og:image',
            content: UrlService.createPictureUrl(this.page.picture),
          });
        }

        const banners = pageBanners['Posts'] || [];
        this.banners = banners.map((item, inxBanner) => {
          const meta = item.post_meta ? JSON.parse(item.post_meta) : {};
          return {
            large: UrlService.createPictureUrl(meta.picture, null, null, true),
            small: UrlService.createPictureUrl(
              meta.picture_mobile,
              null,
              null,
              true,
            ),
            deferLoaded: inxBanner === 0 || false,
          };
        });
        console.log('Banners', this.banners);
      },
      complete: () => {
        this.loaderService.hide();
      },
    });
  }
}
