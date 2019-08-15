import { Component, OnInit, OnDestroy } from '@angular/core';
import { Clinic } from '../../../../models/clinic';
import { ActivatedRoute } from '@angular/router';
import { UrlService } from '../../../../services/url.service';
import { CategoryService } from '../../../../services/category.service';
import { TranslateService } from '@ngx-translate/core';
import { Subscription, forkJoin } from 'rxjs';
import { Meta, Title } from '@angular/platform-browser';
import { NgAnimateScrollService } from 'ng-animate-scroll';

@Component({
  selector: 'app-service-detail',
  templateUrl: './service-detail.component.html',
  styleUrls: ['./service-detail.component.scss'],
})
export class ServiceDetailComponent implements OnInit, OnDestroy {
  public clinic: Clinic;
  private subscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    public categoryService: CategoryService,
    private translate: TranslateService,
    private metaService: Meta,
    private animateScrollService: NgAnimateScrollService,
    private titleService: Title,
  ) {}

  ngOnInit() {
    // const alias = this.route.snapshot.paramMap.get('alias');
    this.route.paramMap.subscribe(params => {
      const alias = params.get('alias');
      this.loadCategories(alias);
    });
    this.subscription = this.translate.onLangChange.subscribe(() => {
      this.loadCategories(this.route.snapshot.params['alias']);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
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
