import { Component, OnInit, Inject, NgZone, PLATFORM_ID } from '@angular/core';
import { Insurance } from '../../../models/insurance';
import { Page } from '../../../models/page';
import { forkJoin, Subscription } from 'rxjs';
import { InsuranceService } from '../../../services/insurance.service';
import { InsuranceMediaService } from '../../../services/insurance-media.service';
import { PageService } from '../../../services/page.service';
import { BannerService } from '../../../services/banner.service';
import { TranslateService } from '@ngx-translate/core';
import { Meta, Title } from '@angular/platform-browser';
import { UrlService } from '../../../services/url.service';
import { ActivatedRoute, Router } from '@angular/router';
import { InsuranceDetail } from '../../../models/insurance-detail';
import { NgAnimateScrollService } from 'ng-animate-scroll';
import { isPlatformBrowser } from '@angular/common';
import jquery from 'jquery';

@Component({
  selector: 'app-insurance-consulting',
  templateUrl: './insurance-consulting.component.html',
  styleUrls: ['./insurance-consulting.component.scss'],
})
export class InsuranceConsultingComponent implements OnInit {

  public insurances: Array<Insurance> = [];
  public page: Page;
  public banners: Array<any> = [];
  public services: Array<any> = [];
  private subscription: Subscription;
  public category;
  private isBrowser = false;

  constructor(@Inject(PLATFORM_ID) platformId,
              private route: ActivatedRoute,
              public insuranceService: InsuranceService,
              public insuranceMediaService: InsuranceMediaService,
              public pageService: PageService,
              public bannerService: BannerService,
              private translate: TranslateService,
              private metaService: Meta,
              private titleService: Title,
              private router: Router,
              private zone: NgZone,
              private animateScrollService: NgAnimateScrollService) {
              this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit() {
    this.loadPage();
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      this.loadService(id);
      this.loadCategory(id);
    });
    this.subscription = this.translate.onLangChange.subscribe(() => {
      this.loadService(this.route.snapshot.params.id);
      this.loadCategory(this.route.snapshot.params.id);
      this.loadPage();
    });
  }


  loadPage() {
    forkJoin(
      this.pageService.fetch('insurancepage'),
      this.translate.get('american_international_hospital'),
    ).subscribe(([data, aihStr]) => {
      const page = data.Post || {};
      this.page = new Page(page);
      // seo
      const pageTitle = `${this.page.name} - ${aihStr}`;
      this.titleService.setTitle(pageTitle);
      this.metaService.updateTag({
        property: 'og:title',
        content: pageTitle,
      });
      this.metaService.updateTag({
        name: 'description',
        content: this.page.metaDesc,
      });
      this.metaService.updateTag({ name: 'keywords', content: this.page.metaKey });
      this.bannerService
        .fetch('insurancepage', this.page.id)
        .subscribe((bannerData: any) => {
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

  loadService(id) {
    this.insuranceService.fetchService(id).subscribe((data: any) => {
      const posts = data['Posts'] || [];
      this.services = posts.map(item => {
        const service = new InsuranceDetail(item);
        service.picturePath = UrlService.createPictureUrl(service.picture);
        service.url = UrlService.createInsuranceUrl(service.alias);
        return service;
      });
    });
  }

  loadCategory(id) {
    this.insuranceService.fetchServiceCate().subscribe((data: any) => {
      const categories = data['Categories'] || [];
      this.category = categories.map(item => {
        const insurance = new Insurance(item);
        insurance.picturePath = UrlService.createPictureUrl(insurance.picture, null, 'category');
        insurance.url = UrlService.createInsuranceDetailUrl(insurance.id, insurance.alias);
        return insurance;
      }).find(item => item.id === parseInt(id, 10));

      setTimeout(() => {
        this.animateScrollService.scrollToElement('insurance-top', 150);
      }, 100);
    });
  }

  openTawk() {
    if(this.isBrowser) {
      this.zone.runOutsideAngular(() => {
        jquery('iframe').trigger('click');
      });
    }
  }


}
