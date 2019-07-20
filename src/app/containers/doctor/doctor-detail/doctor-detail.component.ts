import { Component, OnInit } from '@angular/core';
import { Doctor } from '../../../models/doctor';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../../../services/post.service';
import { UrlService } from '../../../services/url.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-doctor-detail',
  templateUrl: './doctor-detail.component.html',
  styleUrls: ['./doctor-detail.component.scss']
})

export class DoctorDetailComponent implements OnInit {
  public doctor: Doctor;
  constructor(
    private route: ActivatedRoute,
    public postService: PostService,
    private translate: TranslateService
  ) { }

  ngOnInit() {
    // const alias = this.route.snapshot.paramMap.get('alias');
    this.route.paramMap.subscribe(params => {
      const alias = params.get('alias');
      this.loadPosts(alias);
    });

    this.translate
      .onLangChange
      .subscribe(() => {
        const alias = this.route.snapshot.params.alias;
        this.loadPosts(alias);
      });
  }

  private loadPosts(alias) {
    this.postService
      .fetch(alias)
      .subscribe((data: any) => {
        const doctor = new Doctor(data.Post);
        if (doctor.picture) {
          doctor.picturePath = UrlService.createPictureUrl(doctor.picture);
        }
        doctor.longDesc = UrlService.fixPictureUrl(doctor.longDesc);
        console.log('this.doctor', doctor);
        this.doctor = doctor;
      });
  }
}
