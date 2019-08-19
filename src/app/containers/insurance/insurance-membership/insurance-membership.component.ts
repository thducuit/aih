import { Component, OnInit } from '@angular/core';
import { forkJoin, Subscription } from 'rxjs';
import { Page } from '../../../models/page';
import { UrlService } from '../../../services/url.service';
import { Insurance } from '../../../models/insurance';
import { InsuranceService } from '../../../services/insurance.service';
import { InsuranceMediaService } from '../../../services/insurance-media.service';
import { PageService } from '../../../services/page.service';
import { BannerService } from '../../../services/banner.service';
import { TranslateService } from '@ngx-translate/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-insurance-membership',
  templateUrl: './insurance-membership.component.html',
  styleUrls: ['./insurance-membership.component.scss']
})
export class InsuranceMembershipComponent implements OnInit {

  public insurances: Array<Insurance> = [];
  public page: Page;
  public banners: Array<any> = [];
  public categories: Array<any> = [];
  private subscription: Subscription;

  constructor(
    public insuranceService: InsuranceService,
    public insuranceMediaService: InsuranceMediaService,
    public pageService: PageService,
    public bannerService: BannerService,
    private translate: TranslateService,
    private metaService: Meta,
    private titleService: Title,
  ) {}

  ngOnInit() {
    this.loadPage();
    this.loadCategory();
    this.subscription = this.translate.onLangChange.subscribe(() => {
      this.loadPage();
      this.loadCategory();
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

  loadCategory() {
    this.insuranceService.fetchServiceCate().subscribe( (data: any) => {
      const categories = data['Categories'] || [];
      this.categories = categories.map( item => {
        const insurance = new Insurance(item);
        insurance.picturePath = UrlService.createPictureUrl(insurance.picture, null, 'category');
        insurance.url = UrlService.createInsuranceDetailUrl(insurance.id, insurance.alias);
        return insurance;
      }).sort((obj1, obj2) => (obj1.sort >= obj2.sort ? 1 : -1));
    });
  }

}
