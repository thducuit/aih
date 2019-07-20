import { Component, OnInit } from '@angular/core';
import {Page} from "../../models/page";
import {Doctor} from "../../models/doctor";
import {PageService} from "../../services/page.service";
import {DoctorService} from "../../services/doctor.service";
import {BannerService} from "../../services/banner.service";
import {UrlService} from "../../services/url.service";

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.scss']
})
export class DoctorComponent implements OnInit {

  public page: Page;
  public banners: Array<any> = [];
  public doctors: Array<Doctor> = [];
  constructor(public pageService: PageService,
              public doctorService: DoctorService,
              public bannerService: BannerService) { }

  ngOnInit() {
    this.loadPage();
    this.loadDoctors();
  }
  loadPage() {
    this.pageService.fetch('highlight_page').subscribe( (data: any) => {
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

  loadDoctors() {
    this.doctorService.fetch().subscribe((data: any) => {
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

}
