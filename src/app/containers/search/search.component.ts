import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {SearchService} from "../../services/search.service";
import {Blog} from "../../models/blog";
import {UrlService} from "../../services/url.service";
import {Doctor} from "../../models/doctor";
import {Clinic} from "../../models/clinic";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  public keyword;

  public blogs;
  public doctors;
  public clinics;

  constructor(private activatedRoute: ActivatedRoute,
              public searchService: SearchService) {
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.keyword = params['keyword'];
      this.search(this.keyword);
    });
  }

  search(keyword) {
    this.searchService.findPost(keyword, 'doctor').subscribe( (data: any) => {
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

    this.searchService.findPost(keyword, 'news').subscribe( (data: any) => {
      const posts = data.Posts || [];
      const convertedBlogs: any[] = posts.map(post => {
        const blog = new Blog(post);
        blog.picturePath = UrlService.createPictureUrl(blog.picture);
        blog.url = UrlService.createNewsDetailUrl(blog.alias);
        const {video} = blog.meta;
        if (video) {
          const code = video.substring(video.indexOf('?v=') + 3, video.length);
          blog.iframeUrl = UrlService.createIframeUrl(code);
        }
        return blog;
      });
      this.blogs = convertedBlogs;
    });

    this.searchService.findCategory(keyword, 'clinic').subscribe( (data: any) => {
      const posts = data['Categories'] || [];
      this.clinics = posts.map(post => {
        const clinic = new Clinic(post);
        clinic.picturePath = UrlService.createPictureUrl(clinic.picture, null, 'category');
        clinic.url = UrlService.createClinicDetailUrl(clinic.alias);
        return clinic;
      });
    });
  }

  handleSearch() {
    this.search(this.keyword);
  }

}
