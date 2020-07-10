import { Component, OnInit, OnDestroy } from '@angular/core';
import { Page } from '../../../models/page';
import { PageService } from '../../../services/page.service';
import { BannerService } from '../../../services/banner.service';
import { UrlService } from '../../../services/url.service';
import { TranslateService } from '@ngx-translate/core';
import { Subscription, forkJoin } from 'rxjs';
import { ClinicService } from '../../../services/clinic.service';
import { Clinic } from '../../../models/clinic';
import { Meta, Title } from '@angular/platform-browser';
import {LoaderService} from '../../../services/loader-service';
import {environment} from '../../../../environments/environment';
import {Router} from '@angular/router';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit, OnDestroy {
  public page: Page;
  public banners: Array<any> = [];
  public clinics: Array<any> = [];
  private subscription: Subscription;

  constructor(
    public pageService: PageService,
    public bannerService: BannerService,
    public clinicService: ClinicService,
    private translate: TranslateService,
    private loaderService: LoaderService,
    private urlService: UrlService,
    private router: Router,
    private metaService: Meta,
    private titleService: Title
  ) {
  }

  ngOnInit() {
    this.subscription = this.translate
      .onLangChange
      .subscribe(() => {
          return this.router.navigate([this.urlService.getUrlByKey('about')]);
      });
    this.loadPage();
    this.loadClinic();
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  loadPage() {
    this.loaderService.show();
    forkJoin(
    this.pageService
      .fetch('aboutus'),
      this.translate.get('american_international_hospital')
    )
      .subscribe(([data, aihStr]) => {
        const post = data.Post || {};
        const page = new Page(post);
        page.longDesc = UrlService.fixPictureUrl(page.longDesc);
        this.page = page;
        const pageTitle = `${this.page.metaTitle ||  this.page.name} - ${aihStr}`;
        // seo
        this.titleService.setTitle(pageTitle);
        this.metaService.updateTag({
          property: 'og:title',
          content: pageTitle
        });
        this.page.metaDesc && this.metaService.updateTag({ name: 'description', content: this.page.metaDesc });
        this.page.metaDesc && this.metaService.updateTag({ property: 'og:description', content: this.page.metaDesc });
        this.metaService.updateTag({ name: 'keywords', content: this.page.metaKey  || '' });
        this.metaService.updateTag({ property: 'og:url', content: `${environment.host}/about-us/aih-hospital` });

        if (this.page.picture) {
            this.metaService.updateTag({
              property: 'og:image',
              content: UrlService.createPictureUrl(this.page.picture)
            });
        }

        this.bannerService.fetch('aboutus', this.page.id).subscribe((bannerData: any) => {
          const banners = bannerData.Banner;
          this.banners = banners.map(banner => {
            banner.large = UrlService.createMediaUrl(banner.Url);
            banner.small = banner.large;
            banner.url = banner.Link;
            return banner;
          });
        });
      },
      null,
      () => {
          this.loaderService.hide();
      });
  }

  loadClinic() {
    this.loaderService.show();
    this.clinicService.fetchHot().subscribe((data: any) => {
      const posts = data.Categories || [];
      this.clinics = posts.map(post => {
        const clinic = new Clinic(post);
        clinic.picturePath = UrlService.createPictureUrl(clinic.picture, null, 'category');
        clinic.url = `/patient-services/medical-services/${clinic.alias}`;
        return clinic;
      });
      this.loaderService.hide();
    });
  }

}
