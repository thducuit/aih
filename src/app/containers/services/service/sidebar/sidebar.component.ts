import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Clinic} from "../../../../models/clinic";
import {ClinicService} from "../../../../services/clinic.service";
import {UrlService} from "../../../../services/url.service";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public clinics: Array<Clinic> = [];
  constructor(public clinicService: ClinicService) { }

  ngOnInit() {
    this.loadClinics();
  }

  loadClinics() {
    this.clinicService.fetch().subscribe((data: {}) => {
      const posts = data['Categories'] || [];
      this.clinics = posts.map( post => {
        const clinic = new Clinic(post);
        clinic.url = UrlService.createClinicDetailUrl(clinic.alias);
        return clinic;
      });
    });
  }

}
