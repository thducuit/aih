import { Component, OnInit, OnDestroy } from '@angular/core';
import { Doctor } from '../../../models/doctor';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../../../services/post.service';
import { UrlService } from '../../../services/url.service';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { Meta, Title } from '@angular/platform-browser';
import { GlobalEventService } from 'src/app/services/global-event.service';

@Component({
  selector: 'app-doctor-detail',
  templateUrl: './doctor-detail.component.html',
  styleUrls: ['./doctor-detail.component.scss'],
})
export class DoctorDetailComponent implements OnInit, OnDestroy {
  public doctor: Doctor;
  public postNext: Doctor;
  public postPrev: Doctor;
  private subscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    public postService: PostService,
    private globalEventService: GlobalEventService,
    private translate: TranslateService,
    private metaService: Meta,
    private titleService: Title,
  ) {}

  ngOnInit() {
    // const alias = this.route.snapshot.paramMap.get('alias');
    this.route.paramMap.subscribe(params => {
      const alias = params.get('alias');
      this.loadPosts(alias);
    });

    this.subscription = this.translate.onLangChange.subscribe(() => {
      const alias = this.route.snapshot.params.alias;
      this.loadPosts(alias);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private loadPosts(alias) {
    this.postService.fetch(alias).subscribe((data: any) => {
      const doctor = new Doctor(data.Post);
      if (doctor.picture) {
        doctor.picturePath = UrlService.createPictureUrl(doctor.picture);
      }
      doctor.longDesc = UrlService.fixPictureUrl(doctor.longDesc);
      this.doctor = doctor;
      this.postService.fetchNextPrevDoctor(doctor.id).subscribe(data2 => {
        if (data2['PostNext']) {
          const postNext = new Doctor(data2['PostNext']);
          postNext.url = UrlService.createDoctorDetailUrl(postNext.alias);
          this.postNext = postNext;
        }

        if (data2['PostPrev']) {
          const postPrev = new Doctor(data2['PostPrev']);
          postPrev.url = UrlService.createDoctorDetailUrl(postPrev.alias);
          this.postPrev = postPrev;
        }
      });
      // seo
      this.translate
        .get('american_international_hospital')
        .subscribe(aihStr => {
          const pageTitle = `${this.doctor.name} - ${aihStr}`;
          this.titleService.setTitle(pageTitle);
          this.metaService.updateTag({
            property: 'og:title',
            content: pageTitle,
          });
        });
      this.doctor.metaDesc &&
        this.metaService.updateTag({
          name: 'description',
          content: this.doctor.metaDesc,
        });
      this.metaService.updateTag({
        name: 'keywords',
        content: this.doctor.metaKey,
      });
    });
  }

  bookDoctor() {
    if (this.doctor) {
      this.globalEventService.emit('book_doctor', this.doctor.doctorId);
    }
  }
}
