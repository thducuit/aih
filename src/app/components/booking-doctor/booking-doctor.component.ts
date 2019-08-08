import {
  Component,
  EventEmitter,
  HostListener,
  OnInit,
  Output,
  OnDestroy,
  Input,
} from '@angular/core';
import { Doctor } from '../../models/doctor';
import { UrlService } from '../../services/url.service';
import { DoctorService } from '../../services/doctor.service';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-booking-doctor',
  templateUrl: './booking-doctor.component.html',
  styleUrls: ['./booking-doctor.component.scss'],
})
export class BookingDoctorComponent implements OnInit, OnDestroy {
  public isActive: boolean;
  public chosenDoctor: Doctor;
  public placeholder: string;
  public doctors: Array<Doctor> = [];
  private subscription: Subscription;
  public filteredDoctors: Doctor[];

  @Input() animateAfter: boolean;
  @Output() choose = new EventEmitter<any>();

  constructor(
    public doctorService: DoctorService,
    private translate: TranslateService,
  ) {
    this.isActive = false;
  }

  get doctorName() {
    if (!this.chosenDoctor) {
      return '';
    }
    return this.chosenDoctor.name;
  }

  ngOnInit() {
    this.loadDoctors();
    this.subscription = this.translate.onLangChange.subscribe(() => {
      this.loadDoctors();
    });
  }

  onClickOutside(e) {
    this.isActive = false;
  }

  setExpand(expand: boolean) {
    this.isActive = expand;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  loadDoctors() {
    this.doctorService.fetch().subscribe((data: any) => {
      const posts = data.Posts || [];
      this.doctors = posts.map(post => {
        const doctor = new Doctor(post);
        if (doctor.picture) {
          doctor.picturePath = UrlService.createPictureUrl(doctor.picture);
        }
        doctor.url = UrlService.createDoctorDetailUrl(doctor.alias);
        return doctor;
      });
    });
  }

  filterDoctors(doctorIds: string[]) {
    if (!doctorIds) {
      return this.doctors;
    }
    const filteredDoctors = this.filteredDoctors = (this.doctors || []).filter(x => {
      return doctorIds.indexOf(x.doctorId) >= 0;
    });
    if (!filteredDoctors.length) {
      this.translate
      .get('no_doctor_for_speciality')
      .subscribe(str => {
        Swal.fire({
          text: str,
          confirmButtonText: 'OK'
        });
      });
    }
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
    this.choose.emit(doctor);
    setTimeout(() => {
      this.isActive = false;
    }, 200);
  }

  chooseDoctor(doctorId) {
    const doctor = this.doctors.find(x => x.doctorId === doctorId);
    if (doctor) {
      this.onChoose(doctor);
    }
  }
}
