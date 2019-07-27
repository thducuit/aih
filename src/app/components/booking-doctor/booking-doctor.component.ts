import {Component, EventEmitter, HostListener, OnInit, Output} from '@angular/core';
import {Doctor} from '../../models/doctor';
import {UrlService} from "../../services/url.service";
import {DoctorService} from "../../services/doctor.service";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-booking-doctor',
  templateUrl: './booking-doctor.component.html',
  styleUrls: ['./booking-doctor.component.scss']
})
export class BookingDoctorComponent implements OnInit {

  public isActive: boolean;
  public chosenDoctor: Doctor;
  public placeholder: string;
  public doctors: Array<Doctor> = [];
  @Output() choose = new EventEmitter<any>();
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

  constructor(
    public doctorService: DoctorService,
    private translate: TranslateService
  ) {
    this.isActive = false;
  }

  ngOnInit() {
    this.loadDoctors();
    this.translate
      .onLangChange
      .subscribe(() => {
        this.loadDoctors();
      });
  }

  loadDoctors() {
    this.doctorService.fetch().subscribe((data: any) => {
      const posts = data.Posts || [];
      this.doctors = posts.map(post => {
        const doctor = new Doctor(post);
        if (doctor.picture) {
          doctor.picturePath = UrlService.createPictureUrl(doctor.picture);
        }
        return doctor;
      });
    });
  }

  handleExpand($event, doctor) {
    $event.stopPropagation();
    this.doctors.map(item => {
      if (doctor.id !== item.id) {
        item.isExpanded = false;
      }
    });
    doctor.isExpanded = !doctor.isExpanded;
  }

  handleInputClick() {
    this.isActive = true;
  }

  onChoose(doctor) {
    this.chosenDoctor = doctor;
    this.placeholder = doctor.name;
    this.choose.emit(doctor);
    setTimeout (() => {
      this.isActive = false;
    }, 200);
  }

}
