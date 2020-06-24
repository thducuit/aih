import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ChangeDetectorRef,
  AfterViewInit,
  Renderer2,
  ElementRef,
  AfterViewChecked, Inject, PLATFORM_ID,
} from '@angular/core';
import { Clinic } from '../../../../models/clinic';
import { ActivatedRoute, Router } from '@angular/router';
import { UrlService } from '../../../../services/url.service';
import { CategoryService } from '../../../../services/category.service';
import { TranslateService } from '@ngx-translate/core';
import { Subscription, forkJoin } from 'rxjs';
import { Meta, Title } from '@angular/platform-browser';
import { NgAnimateScrollService } from 'ng-animate-scroll';
import { PostService } from '../../../../services/post.service';
import { isPlatformBrowser } from '@angular/common';
import { environment } from '../../../../../environments/environment';
import { LoaderService } from '../../../../services/loader-service';
import { GlobalEventService } from '../../../../services/global-event.service';
import { BlogService } from '../../../../services/blog.service';

@Component({
  selector: 'app-service-detail',
  templateUrl: './service-detail.component.html',
  styleUrls: ['./service-detail.component.scss'],
})
export class ServiceDetailComponent
  implements OnInit, OnDestroy, AfterViewChecked {
  public clinic: Clinic;
  private subscription: Subscription;
  public clinicIds;

  public minHeight = 'auto';

  public isShowWarning = false;

  @ViewChild('serviceCate', { static: false }) serviceCate;
  @ViewChild('copyCate', { static: false }) copyCate;
  @ViewChild('pServiceCate', { static: false }) contentEl: ElementRef;

  constructor(@Inject(PLATFORM_ID) private platformId,
              private route: ActivatedRoute,
              public categoryService: CategoryService,
              public postService: PostService,
              public blogService: BlogService,
              private translate: TranslateService,
              public urlService: UrlService,
              private metaService: Meta,
              private router: Router,
              private animateScrollService: NgAnimateScrollService,
              private globalEventService: GlobalEventService,
              private titleService: Title,
              private loaderService: LoaderService) {
  }

  ngOnInit() {
    this.isShowWarning = false;
    // const alias = this.route.snapshot.paramMap.get('alias');
    this.route.paramMap.subscribe(params => {
      this.isShowWarning = false;
      const alias = params.get('alias');
      this.loadCategories(alias);
    });
    this.subscription = this.translate.onLangChange.subscribe(() => {
      this.isShowWarning = false;
      const alias = this.route.snapshot.params['alias'];
      this.categoryService.getAlias(alias).subscribe((data: any) => {
        const newAlias = data['alias'];
        if (newAlias) {
          return this.router.navigate([
            this.urlService.createClinicDetailUrl(newAlias),
          ]);
        } else {
          return this.router.navigate([this.urlService.getUrlByKey('mservice')]);
        }
      });
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  ngAfterViewChecked() {
    if (isPlatformBrowser(this.platformId)) {
      this.fixHeight();
    }
  }

  private loadCategories(alias) {
    this.loaderService.show();
    if (isPlatformBrowser(this.platformId)) {
      window.scroll(0, 0);
    }
    forkJoin(
      this.categoryService.fetch(alias, 'clinic'),
      this.translate.get('american_international_hospital'),
    ).subscribe(([data, aihStr]) => {
      const clinic = new Clinic(data['Category']);
      if (!clinic.isShow) {
        this.router.navigateByUrl('/').then(e => {
        });
      }
      if (clinic.picture) {
        clinic.picturePath = UrlService.createPictureUrl(clinic.picture, null, 'category');
      }

      clinic.url = `${environment.host}${this.urlService.createClinicDetailUrl(
        clinic.alias,
      )}`;

      clinic.longDesc = UrlService.fixPictureUrl(clinic.longDesc);
      this.clinic = clinic;

      this.clinicIds = [clinic.id];

      // seo
      const pageTitle = `${this.clinic.metaTitle ||
      this.clinic.name} - ${aihStr}`;

      this.titleService.setTitle(pageTitle);

      this.metaService.updateTag({
        property: 'og:title',
        content: pageTitle,
      });
      this.metaService.updateTag({
        name: 'description',
        content: this.clinic.metaDesc,
      });
      this.metaService.updateTag({
        property: 'og:description',
        content: this.clinic.metaDesc,
      });
      this.metaService.updateTag({
        name: 'keywords',
        content: this.clinic.metaKey,
      });
      this.metaService.updateTag({
        property: 'og:url',
        content: this.clinic.url,
      });
      this.metaService.updateTag({
        property: 'og:image',
        content: this.clinic.picturePath,
      });


    }, null, () => {
      this.loaderService.hide();
    });
  }

  handleLoadCateFinish() {
  }

  fixHeight() {
    const jQuery = window['$'];
    const serviceCateHeight = jQuery('#service-cate').outerHeight();
    const copyCateHeight = jQuery('#copy-cate').outerHeight();
    const minHeight = serviceCateHeight >= copyCateHeight ? `${serviceCateHeight}px` : 'auto';
    jQuery('#copy-cate').css('min-height', minHeight);
  }

  bookingClinic(isMobile = false) {
    if (this.clinic) {
      this.isShowWarning = true;
      this.globalEventService.emit('book_clinic', this.clinic.clinicId);
      if (isMobile) {
        this.animateScrollService.scrollToElement('headerPage', 150);
      }
    }
  }
}
