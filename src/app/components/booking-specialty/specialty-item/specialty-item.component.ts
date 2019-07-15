import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { ClinicService } from '../../../services/clinic.service';
import { Clinic } from  '../../../models/clinic';

@Component({
  selector: 'app-specialty-item',
  templateUrl: './specialty-item.component.html',
  styleUrls: ['./specialty-item.component.scss']
})
export class SpecialtyItemComponent implements OnInit {

  public clinics: Array<Clinic> = [];
  @Output() choose = new EventEmitter<Clinic>();
  constructor(public clinicService: ClinicService) { }

  ngOnInit() {
    this.loadClinics();
  }

  loadClinics() {
    this.clinicService.fetch().subscribe((data: {}) => {
      const posts = data['Categories'] || [];
      this.clinics = posts.map( post => new Clinic(post));
    });
  }

  handleChoose(clinic) {
    this.choose.emit(clinic);
  }

}
