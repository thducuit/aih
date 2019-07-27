import { Component, OnInit, OnDestroy } from '@angular/core';
import { Page } from '../../models/page';
import { Doctor } from '../../models/doctor';
import { PageService } from '../../services/page.service';
import { DoctorService } from '../../services/doctor.service';
import { BannerService } from '../../services/banner.service';
import { UrlService } from '../../services/url.service';
import { TranslateService } from '@ngx-translate/core';
import { DepartmentService } from 'src/app/services/department.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.scss']
})
export class DoctorComponent implements OnInit, OnDestroy {

  public page: Page;
  public banner: any = {};
  public doctors: Array<Doctor> = [];
  public departments: any[];
  private subscription: Subscription;

  constructor(
    public pageService: PageService,
    public doctorService: DoctorService,
    public bannerService: BannerService,
    private translate: TranslateService,
    private departmentService: DepartmentService
  ) { }

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
    this.pageService
      .fetch('doctor_page')
      .subscribe((data: any) => {
        const post = data.Post || {};
        const page = new Page(post);
        page.longDesc = UrlService.fixPictureUrl(page.longDesc);
        this.page = page;
        this.bannerService
          .fetch('doctor-page', this.page.id)
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
      });
  }

  loadDoctors() {
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
        });
      });
  }

  loadDepartments() {
    this.departmentService
      .fetch()
      .subscribe((resp) => {
        this.departments = resp;
      });
  }
}
