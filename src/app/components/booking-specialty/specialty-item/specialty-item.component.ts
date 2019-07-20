import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ClinicService } from '../../../services/clinic.service';
import { Clinic } from '../../../models/clinic';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-specialty-item',
  templateUrl: './specialty-item.component.html',
  styleUrls: ['./specialty-item.component.scss']
})
export class SpecialtyItemComponent implements OnInit {

  public clinics: Array<Clinic> = [];
  @Output() choose = new EventEmitter<Clinic>();
  constructor(
    public clinicService: ClinicService,
    private translate: TranslateService
  ) { }

  ngOnInit() {
    this.loadClinics();
    this.translate
      .onLangChange
      .subscribe(() => {
        this.loadClinics();
      });
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
