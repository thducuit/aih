import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../../../services/doctor.service';
import { Doctor } from  '../../../models/doctor';

@Component({
  selector: 'app-doctor-list-item',
  templateUrl: './doctor-list-item.component.html',
  styleUrls: ['./doctor-list-item.component.css']
})
export class DoctorListItemComponent implements OnInit {

  public doctors: Array<Doctor> = [];
  constructor(public doctorService: DoctorService) { }

  ngOnInit() {
    this.loadDoctors();
  }

  loadDoctors() {
    this.doctorService.fetch().subscribe((data: {}) => {
      const posts = data['Posts'] || [];
      this.doctors = posts.map( post => new Doctor(post));
    });
  }

}
