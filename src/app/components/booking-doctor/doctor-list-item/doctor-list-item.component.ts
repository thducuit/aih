import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { DoctorService } from '../../../services/doctor.service';
import { UrlService } from '../../../services/url.service';
import { Doctor } from '../../../models/doctor';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-doctor-list-item',
  templateUrl: './doctor-list-item.component.html',
  styleUrls: ['./doctor-list-item.component.scss'],
})
export class DoctorListItemComponent implements OnInit {
  public doctors: Array<Doctor> = [];
  @Output() choose = new EventEmitter<Doctor>();
  constructor(
    public doctorService: DoctorService,
    private translate: TranslateService
  ) { }

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

  handleChoose(doctor) {
    this.choose.emit(doctor);
  }
}
