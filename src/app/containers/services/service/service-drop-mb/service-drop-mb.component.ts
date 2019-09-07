import { Component, OnInit, OnDestroy } from '@angular/core';
import { ClinicService } from 'src/app/services/clinic.service';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { Clinic } from 'src/app/models/clinic';
import { UrlService } from 'src/app/services/url.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-service-drop-mb',
  templateUrl: './service-drop-mb.component.html',
  styleUrls: ['./service-drop-mb.component.scss'],
})
export class ServiceDropMbComponent implements OnInit, OnDestroy {
  public clinics: Clinic[] = [];
  private subscription: Subscription;

  public selectedClinic: Clinic;
  public expaned = false;

  constructor(
    public clinicService: ClinicService,
    private translate: TranslateService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.loadClinics();
    this.subscription = this.translate.onLangChange.subscribe(() => {
      this.loadClinics();
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  onSelectClinic(clinic: Clinic) {
    if (!clinic) {
      return;
    }
    this.expaned = false;
    this.selectedClinic = clinic;
    this.router.navigate([clinic.url]);
  }

  toggleDropdown() {
    this.expaned = !this.expaned;
  }

  onClickOutSide(e) {
    this.expaned = false;
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
