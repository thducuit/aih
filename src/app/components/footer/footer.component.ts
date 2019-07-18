import { Component, OnInit } from '@angular/core'
import {BlogService} from '../../services/blog.service';
import {Blog} from '../../models/blog';
import {Clinic} from '../../models/clinic';
import {UrlService} from '../../services/url.service';
import {ClinicService} from '../../services/clinic.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  public blogs: Array<Blog> = [];
  public clinics: Array<Clinic> = [];
  constructor(public blogService: BlogService,
              public clinicService: ClinicService) { }

  ngOnInit() {
    this.loadFeatureBlogs();
    this.loadFeatureClinics();
  }
  loadFeatureBlogs() {
    this.blogService.fetchFeature().subscribe( (data: any) => {
      const posts = data.Posts || [];
      this.blogs = posts.map(post => {
        const blog = new Blog(post);
        blog.picturePath = UrlService.createPictureUrl(blog.picture);
        blog.url = UrlService.createNewsDetailUrl(blog.alias);
        blog.name = blog.name.replace(/^(.{4}[^\s]*).*/, '$1');
        return blog;
      });
    });
  }

  loadFeatureClinics() {
    this.clinicService.fetchFeature().subscribe( (data: any) => {
      const posts = data['Categories'] || [];
      this.clinics = posts.map(post => {
        const clinic = new Clinic(post);
        clinic.picturePath = UrlService.createPictureUrl(clinic.picture, null, 'category');
        clinic.url = '/patient-services/medical-services';
        return clinic;
      });
    });
  }

}
