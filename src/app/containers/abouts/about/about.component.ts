import {Component, OnInit, OnDestroy} from '@angular/core';
import {Page} from '../../../models/page';
import {PageService} from '../../../services/page.service';
import {BannerService} from '../../../services/banner.service';
import {UrlService} from '../../../services/url.service';
import {TranslateService} from '@ngx-translate/core';
import {Subscription} from 'rxjs';
import {ClinicService} from "../../../services/clinic.service";
import {Clinic} from "../../../models/clinic";

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
    private translate: TranslateService
  ) {
  }

  ngOnInit() {
    this.loadPage();
    this.loadClinic();
    this.subscription = this.translate
      .onLangChange
      .subscribe(() => {
        this.loadPage();
        this.loadClinic();
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  loadPage() {
    this.pageService
      .fetch('aboutus')
      .subscribe((data: any) => {
        const page = data.Post || {};
        this.page = new Page(page);
        this.bannerService.fetch('aboutus', this.page.id).subscribe((bannerData: any) => {
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

  loadClinic() {
    this.clinicService.fetchHot().subscribe((data: any) => {
      const posts = data.Categories || [];
      this.clinics = posts.map(post => {
        const clinic = new Clinic(post);
        clinic.picturePath = UrlService.createPictureUrl(clinic.picture, null, 'category');
        clinic.url = `/patient-services/medical-services/${clinic.alias}`;
        return clinic;
      });
    });
  }

}
