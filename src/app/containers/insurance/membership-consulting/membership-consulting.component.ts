import { Component, OnInit } from '@angular/core';
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
import { ActivatedRoute } from '@angular/router';
import { InsuranceDetail } from '../../../models/insurance-detail';

@Component({
  selector: 'app-membership-consulting',
  templateUrl: './membership-consulting.component.html',
  styleUrls: ['./membership-consulting.component.scss']
})
export class MembershipConsultingComponent implements OnInit {

  public insurances: Array<Insurance> = [];
  public page: Page;
  public banners: Array<any> = [];
  public services: Array<any> = [];
  private subscription: Subscription;

  constructor(
    private route: ActivatedRoute,
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
    this.loadService(this.route.snapshot.params.id);
    this.subscription = this.translate.onLangChange.subscribe(() => {
      this.loadPage();
      this.loadService(this.route.snapshot.params.id);
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
    this.insuranceService.fetchService(id).subscribe( (data: any) => {
      const posts = data['Posts'] || [];
      this.services = posts.map( item => {
        const service = new InsuranceDetail(item);
        service.picturePath = UrlService.createPictureUrl(service.picture);
        service.url = UrlService.createMemberDetailUrl(service.alias);
        return service;
      });
  });
  }

}
