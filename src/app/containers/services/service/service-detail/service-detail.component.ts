import { Component, OnInit, OnDestroy, ViewChild, ChangeDetectorRef, AfterViewInit, Renderer2, ElementRef } from '@angular/core';
import { Clinic } from '../../../../models/clinic';
import { ActivatedRoute, Router } from '@angular/router';
import { UrlService } from '../../../../services/url.service';
import { CategoryService } from '../../../../services/category.service';
import { TranslateService } from '@ngx-translate/core';
import { Subscription, forkJoin } from 'rxjs';
import { Meta, Title } from '@angular/platform-browser';
import { NgAnimateScrollService } from 'ng-animate-scroll';
import { PostService } from '../../../../services/post.service';

@Component({
  selector: 'app-service-detail',
  templateUrl: './service-detail.component.html',
  styleUrls: ['./service-detail.component.scss'],
})
export class ServiceDetailComponent implements OnInit, OnDestroy, AfterViewInit {
  public clinic: Clinic;
  private subscription: Subscription;
  public clinicIds;

  public minHeight = 'auto';

  @ViewChild('serviceCate', { static: false }) serviceCate;
  @ViewChild('copyCate', { static: false }) copyCate;
  @ViewChild('pServiceCate', { static: false }) contentEl: ElementRef;

  constructor(
    private route: ActivatedRoute,
    public categoryService: CategoryService,
    public postService: PostService,
    private translate: TranslateService,
    private metaService: Meta,
    private router: Router,
    private animateScrollService: NgAnimateScrollService,
    private titleService: Title,
    private cdr: ChangeDetectorRef,
    private renderer: Renderer2
  ) {
  }

  ngOnInit() {
    // const alias = this.route.snapshot.paramMap.get('alias');
    this.route.paramMap.subscribe(params => {
      const alias = params.get('alias');
      this.loadCategories(alias);
    });
    this.subscription = this.translate.onLangChange.subscribe(() => {
      const alias = this.route.snapshot.params['alias'];
      this.postService.getAlias(alias).subscribe((data: any) => {
        const newAlias = data['alias'];
        if (newAlias) {
          return this.router.navigate([UrlService.createClinicDetailUrl(newAlias)]);
        } else {
          return this.router.navigate(['/patient-services/medical-services']);
        }
      });
    });


  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngAfterViewInit() {
      const serviceCateHeight = this.serviceCate.nativeElement.offsetHeight;
      const copyCateHeight = this.copyCate.nativeElement.offsetHeight;
      const copyCateSection = this.contentEl.nativeElement.querySelector('.copy-cate');
      const minHeight = serviceCateHeight > copyCateHeight ? `${serviceCateHeight}px` : 'auto';
      this.renderer.setStyle(copyCateSection, 'min-height', minHeight);
  }

  private loadCategories(alias) {
    forkJoin(
      this.categoryService.fetch(alias, 'clinic'),
      this.translate.get('american_international_hospital'),
    ).subscribe(([data, aihStr]) => {
      const clinic = new Clinic(data['Category']);
      if (clinic.picture) {
        clinic.picturePath = UrlService.createPictureUrl(clinic.picture);
      }
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
        name: 'keywords',
        content: this.clinic.metaKey,
      });

      setTimeout(() => {
        this.animateScrollService.scrollToElement('headerPage', 150);
      }, 100);
    });
  }
}
