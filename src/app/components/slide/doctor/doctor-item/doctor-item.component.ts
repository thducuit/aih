import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../../../../services/doctor.service';
import { Doctor } from  '../../../../models/doctor';
import {UrlService} from '../../../../services/url.service';

@Component({
  selector: 'app-doctor-item',
  templateUrl: './doctor-item.component.html',
  styleUrls: ['./doctor-item.component.scss']
})
export class DoctorItemComponent implements OnInit {

  public doctors: Array<Doctor> = [];
  constructor(public doctorService: DoctorService) { }

  ngOnInit() {
    this.loadDoctors();
  }

  loadDoctors() {
    this.doctorService.fetch().subscribe((data: {}) => {
      const posts = data['Posts'] || [];
      this.doctors = posts.map( post => {
        const doctor = new Doctor(post);
        if (doctor.picture) {
          doctor.picturePath = UrlService.createPictureUrl(doctor.picture);
        }
        return doctor;
      });
    });
  }

}
