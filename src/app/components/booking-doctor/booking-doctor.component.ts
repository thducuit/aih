import {Component, HostListener, OnInit} from '@angular/core';
import {Doctor} from '../../models/doctor';

@Component({
  selector: 'app-booking-doctor',
  templateUrl: './booking-doctor.component.html',
  styleUrls: ['./booking-doctor.component.scss']
})
export class BookingDoctorComponent implements OnInit {

  public isActive: boolean;
  public chosenDoctor: Doctor;
  public placeholder: string;
  private wasInside = false;
  @HostListener('click')
  clickInside() {
    this.wasInside = true;
  }

  @HostListener('document:click')
  clickout() {
    if (!this.wasInside) {
      this.isActive = false;
    }
    this.wasInside = false;
  }

  constructor() {
    this.isActive = false;
  }

  ngOnInit() {

  }

  handleInputClick() {
    this.isActive = true;
  }

  onChoose(doctor) {
    this.chosenDoctor = doctor;
    this.placeholder = doctor.name;
    setTimeout (() => {
      this.isActive = false;
    }, 200);
  }

}
