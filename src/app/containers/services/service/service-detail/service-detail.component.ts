import { Component, OnInit } from '@angular/core';
import { Clinic } from '../../../../models/clinic';
import { ActivatedRoute } from '@angular/router';
import { UrlService } from '../../../../services/url.service';
import { CategoryService } from '../../../../services/category.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-service-detail',
  templateUrl: './service-detail.component.html',
  styleUrls: ['./service-detail.component.scss']
})
export class ServiceDetailComponent implements OnInit {

  public clinic: Clinic;
  constructor(
    private route: ActivatedRoute,
    public categoryService: CategoryService,
    private translate: TranslateService
  ) { }

  ngOnInit() {
    // const alias = this.route.snapshot.paramMap.get('alias');
    this.route.paramMap.subscribe(params => {
      const alias = params.get('alias');
      this.loadCategories(alias);
    });
    this.translate
    .onLangChange
    .subscribe(() => {
      this.loadCategories(this.route.snapshot.params['alias']);
    });
  }

  private loadCategories(alias) {
    this.categoryService.fetch(alias, 'clinic').subscribe((data: any) => {
      const clinic = new Clinic(data.Category);
      if (clinic.picture) {
        clinic.picturePath = UrlService.createPictureUrl(clinic.picture);
      }
      clinic.longDesc = UrlService.fixPictureUrl(clinic.longDesc);
      this.clinic = clinic;
    });
  }
}
