import { Component, EventEmitter, OnInit, Output, OnDestroy } from '@angular/core';
import { ClinicService } from '../../../services/clinic.service';
import { Clinic } from '../../../models/clinic';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-specialty-item',
  templateUrl: './specialty-item.component.html',
  styleUrls: ['./specialty-item.component.scss']
})
export class SpecialtyItemComponent implements OnInit, OnDestroy {

  public clinics: Array<Clinic> = [];
  @Output() choose = new EventEmitter<Clinic>();
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
      this.clinics = posts.map(post => new Clinic(post));
    });
  }

  handleChoose(clinic) {
    this.choose.emit(clinic);
  }

}
