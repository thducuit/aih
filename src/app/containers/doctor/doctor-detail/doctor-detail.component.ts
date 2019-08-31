import { Component, OnInit, OnDestroy } from '@angular/core';
import { Doctor } from '../../../models/doctor';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from '../../../services/post.service';
import { UrlService } from '../../../services/url.service';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { Meta, Title } from '@angular/platform-browser';
import { GlobalEventService } from 'src/app/services/global-event.service';
import { NgAnimateScrollService } from 'ng-animate-scroll';
import { LoaderService } from '../../../services/loader-service';

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

  public isShowWarning = false;

  constructor(private route: ActivatedRoute,
              public postService: PostService,
              private globalEventService: GlobalEventService,
              private translate: TranslateService,
              private metaService: Meta,
              private titleService: Title,
              private loaderService: LoaderService,
              private router: Router,
              private animateScrollService: NgAnimateScrollService) {
  }

  ngOnInit() {
    this.isShowWarning = false;
    // const alias = this.route.snapshot.paramMap.get('alias');
    this.route.paramMap.subscribe(params => {
      this.isShowWarning = false;
      const alias = params.get('alias');
      this.loadPosts(alias);
    });

    this.subscription = this.translate.onLangChange.subscribe(() => {
      this.isShowWarning = false;
      const alias = this.route.snapshot.params.alias;
      this.postService.getAlias(alias).subscribe((data: any) => {
        const newAlias = data['alias'];
        if (newAlias) {
          return this.router.navigate([UrlService.createDoctorDetailUrl(newAlias)]);
        } else {
          return this.router.navigate(['/doctor']);
        }
      });
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private loadPosts(alias) {
    this.loaderService.show();
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
      this.doctor.metaDesc &&
      this.metaService.updateTag({
        name: 'og:description',
        content: this.doctor.metaDesc,
      });
      this.metaService.updateTag({
        name: 'keywords',
        content: this.doctor.metaKey,
      });

      this.metaService.updateTag({
        property: 'og:image',
        content: this.doctor.picturePath,
      });

      setTimeout(() => {
        this.animateScrollService.scrollToElement('headerPage', 50);
        this.loaderService.hide();
      }, 100);
    });
  }

  bookDoctor(isMobile = false) {
    if (this.doctor) {
      this.isShowWarning = true;
      this.globalEventService.emit('book_doctor', this.doctor.doctorId);
      if (isMobile) {
        setTimeout(() => {
          this.animateScrollService.scrollToElement('headerPage', 150);
        }, 100);
      }
    }
  }
}
