import { Component, EventEmitter, OnInit, Output, OnDestroy } from '@angular/core';
import { Clinic } from '../../../../models/clinic';
import { ClinicService } from '../../../../services/clinic.service';
import { UrlService } from '../../../../services/url.service';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnDestroy {
  public clinics: Array<Clinic> = [];
  private subscription: Subscription;

  constructor(
    public clinicService: ClinicService,
    private translate: TranslateService
  ) { }

  ngOnInit() {
    this.loadClinics();
    this.subscription = this.translate
      .onLangChange
      .subscribe(() => {
        this.loadClinics();
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  loadClinics() {
    this.clinicService.fetch().subscribe((data: {}) => {
      const posts = data['Categories'] || [];
      this.clinics = posts.map(post => {
        const clinic = new Clinic(post);
        clinic.url = UrlService.createClinicDetailUrl(clinic.alias);
        return clinic;
      });
    });
  }

}
