import { Component, OnInit, OnDestroy } from '@angular/core';
import { Page } from '../../models/page';
import { Doctor } from '../../models/doctor';
import { PageService } from '../../services/page.service';
import { DoctorService } from '../../services/doctor.service';
import { BannerService } from '../../services/banner.service';
import { UrlService } from '../../services/url.service';
import { TranslateService } from '@ngx-translate/core';
import { DepartmentService } from 'src/app/services/department.service';
import { Subscription, forkJoin } from 'rxjs';
import { Meta, Title } from '@angular/platform-browser';
import { Clinic } from '../../models/clinic';
import { ClinicService } from '../../services/clinic.service';
import {LoaderService} from '../../services/loader-service';
import { NgAnimateScrollService } from 'ng-animate-scroll';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.scss']
})
export class DoctorComponent implements OnInit, OnDestroy {

  public page: Page;
  public banner: any = {};
  public doctors: Array<Doctor> = [];
  public clinics: Array<Clinic> = [];
  public departments: any[];
  private subscription: Subscription;

  public currPage = 1;
  public currDoctors = [];
  public filterDoctors = [];
  private perPage = 8;
  public hideShowMore = false;

  constructor(
    public pageService: PageService,
    public doctorService: DoctorService,
    public bannerService: BannerService,
    public clinicService: ClinicService,
    private translate: TranslateService,
    private loaderService: LoaderService,
    private metaService: Meta,
    private animateScrollService: NgAnimateScrollService,
    private titleService: Title) {
  }

  ngOnInit() {
    this.loadPage();
    this.loadDoctors();
    this.loadDepartments();
    this.subscription = this.translate
      .onLangChange
      .subscribe(() => {
        this.loadPage();
        this.loadDoctors();
        this.loadDepartments();
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  loadPage() {
    this.loaderService.show();
    forkJoin(
    this.pageService
      .fetch('doctor_page'),
      this.translate.get('american_international_hospital')
    )
      .subscribe(([data, aihStr]) => {
        const post = data.Post || {};
        const page = new Page(post);
        page.longDesc = UrlService.fixPictureUrl(page.longDesc);
        this.page = page;
        // seo
        const pageTitle = `${this.page.metaTitle || this.page.name} - ${aihStr}`;
        this.titleService.setTitle(pageTitle);
        this.metaService.updateTag({
          property: 'og:title',
          content: pageTitle,
        });
        this.metaService.updateTag({ name: 'description', content: this.page.metaDesc });
        this.metaService.updateTag({ property: 'og:description', content: this.page.metaDesc });
        this.metaService.updateTag({ name: 'keywords', content: this.page.metaKey });

        if(this.page.picture) {
            this.metaService.updateTag({
              name: 'og:image',
              content: UrlService.createPictureUrl(this.page.picture),
            });
        }
        
        this.bannerService
          .fetch('doctor_page', this.page.id)
          .subscribe((bannersResp: any) => {
            const banner = bannersResp.Banner[0];
            if (banner) {
              banner.large = UrlService.createMediaUrl(banner.Url);
              banner.small = banner.large;
              banner.url = banner.Link;
              banner.title = banner.title;
              banner.desc = banner.desc;
              this.banner = banner;
            }
          });
      },
      null,
      () => {
          this.loaderService.hide();
      });
  }

  loadDoctors() {
    this.loaderService.show();
    window.scroll(0,0);
    this.doctorService
      .fetch()
      .subscribe((data: any) => {
        const posts = data.Posts || [];
        this.doctors = posts.map(post => {
          const doctor = new Doctor(post);
          if (doctor.picture) {
            doctor.picturePath = UrlService.createPictureUrl(doctor.picture);
          }
          doctor.url = UrlService.createDoctorDetailUrl(doctor.alias);
          return doctor;
        })
        .filter( item => item.picture ? true : false )
        .sort((obj1, obj2) => (obj1.sort >= obj2.sort ? 1 : -1));
        this.filterDoctors = [...this.doctors];
        this.currDoctors = this.filterDoctors.slice(0, this.currPage * this.perPage);
      });
  }

  loadDepartments() {
    this.loaderService.show();
    this.clinicService.fetch().subscribe((data: {}) => {
      const posts = data['Categories'] || [];
      this.clinics = posts.map(post => new Clinic(post));
      this.loaderService.hide();
    });
  }

  loadMore() {
    this.currPage += 1;
    this.currDoctors = this.filterDoctors.slice(0, this.currPage * this.perPage);
    if (this.currDoctors.length >= this.filterDoctors.length) {
      this.hideShowMore = true;
    }
  }

  handleSelectedClinic(item) {
    this.filterDoctors = this.doctors.filter( (doctor) =>  {
      const postHis = doctor.meta.his_clinic_ids || [];
      const catHis = item.meta.his_clinic_ids || [];
      return postHis.some(r => catHis.indexOf(r) >= 0) || doctor.categories.indexOf(item.id) >= 0 || item.id === doctor.categoryId;
    });
    this.currPage = 1;
    this.currDoctors = this.filterDoctors.slice(0, this.currPage * this.perPage);
    this.hideShowMore = false;
    if (this.currDoctors.length >= this.filterDoctors.length) {
      this.hideShowMore = true;
    }
  }
}
