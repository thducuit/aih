import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import {Doctor} from '../../../models/doctor';
import {ActivatedRoute, Router} from '@angular/router';
import {PostService} from '../../../services/post.service';
import {UrlService} from '../../../services/url.service';
import {TranslateService} from '@ngx-translate/core';
import {Subscription} from 'rxjs';
import {Meta, Title} from '@angular/platform-browser';
import {GlobalEventService} from 'src/app/services/global-event.service';
import {NgAnimateScrollService} from 'ng-animate-scroll';
import {LoaderService} from '../../../services/loader-service';
import {environment} from '../../../../environments/environment';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';

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

    constructor(
                @Inject(DOCUMENT) private document,
                @Inject(PLATFORM_ID) private platformId,
                private route: ActivatedRoute,
                public postService: PostService,
                private globalEventService: GlobalEventService,
                private translate: TranslateService,
                private metaService: Meta,
                private titleService: Title,
                private loaderService: LoaderService,
                private urlService: UrlService,
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
                    return this.router.navigate([this.urlService.createDoctorDetailUrl(newAlias)]);
                } else {
                    return this.router.navigate([this.urlService.getUrlByKey('doctor')]);
                }
            });
        });
    }

    ngOnDestroy() {
      if (this.subscription) {
        this.subscription.unsubscribe();
      }
    }

    private loadPosts(alias) {
        this.loaderService.show();
        if (isPlatformBrowser(this.platformId)) {
          window.scroll(0, 0);
        }
        this.postService.fetch(alias).subscribe((data: any) => {
            const doctor = new Doctor(data.Post);
            if (!doctor.isShow) {
                this.router.navigateByUrl('/').then(e => {});
            }
            if (doctor.picture) {
                doctor.picturePath = UrlService.createPictureUrl(doctor.picture);
            }
            doctor.longDesc = UrlService.fixPictureUrl(doctor.longDesc);
            doctor.url = `${environment.host}${this.urlService.createDoctorDetailUrl(
                doctor.alias,
            )}`;
            this.doctor = doctor;
            this.postService.fetchNextPrevDoctor(doctor.id, doctor.categoryId).subscribe(data2 => {
                if (data2['PostNext']) {
                    const postNext = new Doctor(data2['PostNext']);
                    postNext.url = this.urlService.createDoctorDetailUrl(postNext.alias);
                    this.postNext = postNext;
                }

                if (data2['PostPrev']) {
                    const postPrev = new Doctor(data2['PostPrev']);
                    postPrev.url = this.urlService.createDoctorDetailUrl(postPrev.alias);
                    this.postPrev = postPrev;
                }
            });

            // seo
            this.translate
                .get('american_international_hospital')
                .subscribe(aihStr => {
                    const pageTitle = `${this.doctor.metaTitle ||  this.doctor.name} - ${aihStr}`;
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
                property: 'og:description',
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
            this.metaService.updateTag({
                property: 'og:url',
                content: doctor.url,
            });

            this.loaderService.hide();
        });
    }

    bookDoctor(isMobile = false) {
        if (this.doctor) {
            this.isShowWarning = true;
            this.globalEventService.emit('book_doctor', this.doctor.doctorId);
            if (isMobile) {
                this.animateScrollService.scrollToElement('headerPage', 150);
            }
        }
    }
}
