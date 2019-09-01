import moment from 'moment';
import Swal from 'sweetalert2';
import { AfterViewInit, Component, Inject, Input, OnDestroy, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Clinic } from 'src/app/models/clinic';
import { Doctor } from 'src/app/models/doctor';
import { BookingDateComponent } from '../booking-date/booking-date.component';
import { BookingDoctorComponent } from '../booking-doctor/booking-doctor.component';
import { BookingSpecialtyComponent } from '../booking-specialty/booking-specialty.component';
import { Schedule } from 'src/app/models/schedule';
import { TranslateService } from '@ngx-translate/core';
import { BookingService } from 'src/app/services/booking.service';
import { isPlatformBrowser } from '@angular/common';
import { ngbDateStructToString } from 'src/app/utilities';
import { DateService } from 'src/app/services/date.service';
import { forkJoin } from 'rxjs';
import { BookingPhoneNumberComponent } from '../booking-phone-number/booking-phone-number.component';
import { GlobalEventService } from 'src/app/services/global-event.service';
import { BookingTimeComponent } from '../booking-time/booking-time.component';
import { environment } from 'src/environments/environment';
import { RecaptchaComponent } from 'ng-recaptcha';

const DaysOfWeek = ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'];

@Component({
  selector: 'app-booking-base',
  templateUrl: './booking-base.component.html',
  styleUrls: ['./booking-base.component.scss'],
})
export class BookingBaseComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input()
  public useForHome: boolean;

  @ViewChild('bookingPhoneNumer', { static: false })
  bookingPhoneNumer: BookingPhoneNumberComponent;
  @ViewChild('bookingDate', { static: false })
  bookingDate: BookingDateComponent;
  @ViewChild('bookingDoctor', { static: false })
  bookingDoctor: BookingDoctorComponent;
  @ViewChild('bookingSpecialty', { static: false })
  bookingSpecialty: BookingSpecialtyComponent;
  @ViewChild('bookingTime', { static: false })
  bookingTime: BookingTimeComponent;
  public schedule: Schedule[];
  public doctorSchedule: Schedule;
  public selectedDoctor: Doctor;
  public selectedClinic: Clinic;
  public selectedTime: any;
  public selectedDate: NgbDateStruct;
  public selectedCustomerId: any;
  public selectedPhone: any;
  public timeBlock = [];

  public animatePhone = false;
  public animateClinic = false;
  public animateDoctor = false;
  public animateDate = false;
  public animateTime = false;
  public animateBooking = false;

  public isShowPopupCatcha = false;

  public captchaResponse;
  public recaptchaSiteKey = environment.recaptchaSiteKey;

  private chooseDoctorDelegate: (id) => void;
  private chooseClinicDelegate: (id) => void;

  public isLoadTimeFail = false;

  @ViewChild('recaptcha', { static: true }) recaptcha: RecaptchaComponent;

  constructor(@Inject(PLATFORM_ID) private platformId,
              private translate: TranslateService,
              public bookingService: BookingService,
              private globalEventService: GlobalEventService) {
    this.chooseDoctorDelegate = this.chooseDoctorById.bind(this);
    this.chooseClinicDelegate = this.chooseClinicById.bind(this);
  }

  ngOnInit() {
    this.loadSchedule();
    this.globalEventService.on('book_doctor', this.chooseDoctorDelegate);
    this.globalEventService.on('book_clinic', this.chooseClinicDelegate);
  }

  ngOnDestroy() {
    this.globalEventService.off('book_doctor', this.chooseDoctorDelegate);
    this.globalEventService.off('book_clinic', this.chooseClinicDelegate);
  }

  ngAfterViewInit() {
    this.animateNextStep();
  }

  loadSchedule() {
    this.bookingService.callDoctorScheduleFromTq().subscribe((data: any) => {
      if (data['Data']) {
        const schedule = JSON.parse(data['Data']);
        this.schedule = schedule.map(item => {
          return new Schedule(item);
        });

        if (this.bookingDoctor) {
          this.bookingDoctor.filterDoctors(this.filterAvailableDoctors(), true);
        }
      }
    });
  }

  findDoctorSchedule(doctorId) {
    return this.schedule.find(x => {
      return x.doctorId === doctorId;
    });
  }

  handleSelectDoctor(doctor: Doctor) {
    this.selectedDoctor = doctor;
    if (doctor) {
      // this.doctorSchedule = this.findDoctorSchedule(doctor.doctorId);
      //
      // this.bookingSpecialty &&
      // this.bookingSpecialty.chooseByClinicId(this.doctorSchedule.clinicId);
      //
      if (this.selectedDate) {
        this.loadTime(this.selectedDoctor.doctorId, this.selectedDate);
      }
      this.bookingSpecialty.filterClinicByDoctor(doctor);

      this.loadAbsenceDateByDoctor(doctor);
    }
  }

  handleSelectDate(date: NgbDateStruct) {
    this.selectedDate = date;
    if (!this.selectedDoctor) {
      this.openWarningDoctor();
      this.bookingDate.reset();
    }
    // if (this.bookingDoctor) {
    //   this.bookingDoctor.filterDoctors(this.filterAvailableDoctors());
    // }
    if (this.selectedDoctor) {
      this.loadTime(this.selectedDoctor.doctorId, date);
    }
    this.animateNextStep();
  }

  handleSelectTime(time) {
    this.selectedTime = time;
    this.animateNextStep();
  }

  handleSelectCustomerId(customerId) {
    this.selectedCustomerId = customerId;
    this.animateNextStep();
  }

  handleSelectClinic(object) {
    const { clinic, isReset } = object;
    this.selectedClinic = clinic;
    if (clinic) {
      // this.bookingDoctor.filterDoctors(this.filterAvailableDoctors());
      // if (this.selectedDoctor) {
      //   const doctorSchedule = this.findDoctorSchedule(
      //     this.selectedDoctor.doctorId,
      //   );
      //   if (doctorSchedule && doctorSchedule.clinicId !== clinic.clinicId) {
      //     this.bookingDoctor.onChoose(null);
      //   }
      // }
      this.bookingDoctor.filterDoctorsByClinic(clinic);
      if (isReset) {
        this.bookingDate.reset();
        this.bookingDoctor.reset();
        this.bookingTime.reset();
      }
    }
    this.animateNextStep();
  }

  chooseDoctorById(doctorId) {
    this.bookingDoctor && this.bookingDoctor.chooseDoctor(doctorId);
    this.animateNextStep();
  }

  chooseClinicById(clinicId) {
    this.bookingSpecialty && this.bookingSpecialty.chooseByClinicId(clinicId);
    this.animateNextStep();
  }

  loadAbsenceDateByDoctor(doctor) {
    const doctorId = doctor.doctorId;
    const scheduleAbsenceOfDoctor = (this.schedule || [])
      .filter(x => x.timeSlot === -1)
      .filter(x => x.doctorId === doctorId);
    const scheduleOfDoctor = (this.schedule || [])
      .filter(x => x.doctorId === doctorId);
    const startDate = moment();
    const endDate = moment(startDate).add(2, 'M');

    const offs = [];
    const ons = [];

    for (const m = moment(startDate); m.diff(endDate, 'days') <= 0; m.add(1, 'days')) {
      const currentDate = m
        ? moment(`${m.format('YYYY-MM-DD')}T00:00:00`)
        : null;
      const availableDays = (scheduleOfDoctor || []).filter(x => {
        let result = true;
        if (currentDate) {
          const dateFrom = moment(x.dateFrom);
          const dateTo = moment(x.dateTo);
          result =
            result &&
            dateFrom.isSameOrBefore(currentDate, 'day') &&
            dateTo.isSameOrAfter(currentDate, 'day');
          result = result && x.slot.indexOf(DaysOfWeek[currentDate.day()]) >= 0;
        }
        return result;
      });

      const absenceDays = (scheduleAbsenceOfDoctor || []).filter(x => {
        let result = true;
        if (this.selectedClinic) {
          result = result && x.clinicId === this.selectedClinic.clinicId;
        }
        if (currentDate) {
          const dateFrom = moment(x.dateFrom);
          const dateTo = moment(x.dateTo);
          result =
            result &&
            dateFrom.isSameOrBefore(currentDate, 'day') &&
            dateTo.isSameOrAfter(currentDate, 'day');
        }
        return result;
      });

      if ((absenceDays && absenceDays.length) || (availableDays && availableDays.length === 0)) {
        offs.push(moment(m));
      } else if (availableDays && availableDays.length) {
        ons.push(moment(m));
      }
    }

    if (this.bookingDate) {
      this.bookingDate.handleDisableDays(offs);
    }

  }

  filterAvailableDoctors() {
    if (!this.schedule || (!this.selectedClinic && !this.selectedDate)) {
      return null; // This will enable all doctors
    }
    const selectedDate = this.selectedDate;
    const currentDate = selectedDate
      ? moment(`${ngbDateStructToString(selectedDate)}T00:00:00`)
      : null;

    // available Doctor
    const doctorIds = (this.schedule || [])
      .filter(x => {
        let result = true;
        if (this.selectedClinic) {
          result = result && x.clinicId === this.selectedClinic.clinicId;
        }
        if (currentDate) {
          const dateFrom = moment(x.dateFrom);
          const dateTo = moment(x.dateTo);
          result =
            result &&
            dateFrom.isSameOrBefore(currentDate, 'day') &&
            dateTo.isSameOrAfter(currentDate, 'day');
          result = result && x.slot.indexOf(DaysOfWeek[currentDate.day()]) >= 0;
        }
        return result;
      })
      .map(x => {
        return x.doctorId;
      });

    // absence Doctor
    const doctorOffIds = (this.schedule || [])
      .filter(x => x.timeSlot === -1)
      .filter(x => {
        let result = true;
        if (this.selectedClinic) {
          result = result && x.clinicId === this.selectedClinic.clinicId;
        }
        if (currentDate) {
          const dateFrom = moment(x.dateFrom);
          const dateTo = moment(x.dateTo);
          result =
            result &&
            dateFrom.isSameOrBefore(currentDate, 'day') &&
            dateTo.isSameOrAfter(currentDate, 'day');
        }
        return result;
      })
      .map(x => {
        return x.doctorId;
      });

    return doctorIds.filter(x => {
      return doctorOffIds.indexOf(x) < 0;
    });
  }

  handleSelectCustomerPhone(phone) {
    this.selectedPhone = phone;
    this.animateNextStep();
  }

  handleBooking() {
    if (!this.selectedPhone) {
      this.openWarningPhone();
      return;
    }
    if (!this.selectedDoctor) {
      this.openWarningDoctor();
      return;
    }
    if (!this.selectedTime) {
      this.openWarningTime();
      return;
    }

    this.isShowPopupCatcha = true;
    return;
  }

  callApiBooking() {
    this.bookingService
      .callBooking(
        this.selectedClinic ? this.selectedClinic.clinicId : '',
        this.selectedDoctor.doctorId,
        this.selectedDate,
        this.selectedTime,
        this.selectedPhone,
      )
      .subscribe((data: any) => {
        const bookingId = data['booking_id'] || 0;
        if (this.selectedCustomerId === -1) {
          if (bookingId) {
            this.openSuccess();
            this.reset();
          }
        } else {
          if (bookingId) {
            this.bookingService
              .callUpdateBooking(this.selectedCustomerId, bookingId)
              .subscribe((data2: any) => {
                this.openSuccess();
                this.reset();
              });
          } else {
            this.openFail();
          }
        }
      });
  }

  openWarningPhone() {
    forkJoin(
      this.translate.get('text_booking_require_phone'),
      this.translate.get('text_close'),
    ).subscribe(([message, buttonText]) => {
      Swal.fire({
        text: message,
        confirmButtonText: buttonText,
      });
    });
  }

  openSuccess() {
    forkJoin(
      this.translate.get('text_booking_success'),
      this.translate.get('text_close'),
      this.translate.get('text_booking_success_1'),
      this.translate.get('text_booking_success_2'),
      this.translate.get('text_booking_success_3'),
    ).subscribe(([message, buttonText, m1, m2, m3]) => {
      Swal.fire({
        text: message,
        customClass: 'alert-booking',
        background: '#007298',
        html: '<div class="alert-custom-booking"><div class="img-logo"></div>' +
          '<div class="alert-header">' + m1 + '<br/>' + m2 +
          '</div> ' +
          '<div class="alert-content">' + m3 + '</div>' +
          '</div>',
        showCloseButton: false,
        showCancelButton: false,
        showConfirmButton: false,
      }).then(() => {
        // window.location.reload();
      });
    });
  }

  openWarningDoctor() {
    forkJoin(
      this.translate.get('text_booking_require_doctor'),
      this.translate.get('text_close'),
    ).subscribe(([message, buttonText]) => {
      Swal.fire({
        text: message,
        confirmButtonText: buttonText,
      });
    });
  }

  openWarningTime() {
    forkJoin(
      this.translate.get('text_booking_require_time'),
      this.translate.get('text_close'),
    ).subscribe(([message, buttonText]) => {
      Swal.fire({
        text: message,
        confirmButtonText: buttonText,
      });
    });
  }

  openFail() {
    forkJoin(
      this.translate.get('text_booking_error'),
      this.translate.get('text_close'),
    ).subscribe(([message, buttonText]) => {
      Swal.fire({
        text: message,
        confirmButtonText: buttonText,
      });
    });
  }

  loadTime(doctorId, selectedDate: NgbDateStruct) {
    this.isLoadTimeFail = false;
    this.bookingService
      .callDateBooking(doctorId, selectedDate)
      .subscribe((data: any) => {
        const response = data['Data'] || null;
        console.log('response', response);
        if (response) {
          const timeData = JSON.parse(response);
          let aihTimeBlocks = [];
          let aihTimeBlocked = [];
          timeData.map(item => {
            aihTimeBlocks = [...aihTimeBlocks, ...item['timeBlock']];
            aihTimeBlocked = [...aihTimeBlocked, ...item['timeBlocked']];
          });
          aihTimeBlocks = [...new Set(aihTimeBlocks)];
          aihTimeBlocked = [...new Set(aihTimeBlocked)];
          this.loadTqTime(selectedDate, aihTimeBlocks, aihTimeBlocked);
        }else {
          this.loadTqTime(selectedDate);
          this.isLoadTimeFail = true;
        }
      }, () => {
        this.loadTqTime(selectedDate);
        this.isLoadTimeFail = true;
      });
  }

  loadTqTime(selectedDate, aihTimeBlocks = [], aihTimeBlocked = []) {
    const newDate = ngbDateStructToString(selectedDate);
    this.bookingService
      .callDateBookingTemp(newDate)
      .subscribe((data2: any) => {
        const response2 = data2['Bookings'] || [];
        const timeBlocked = response2.map(item => {
          const time = item['booking_datetime'];
          const currentDate = new Date(time);
          const nextDate = new Date(currentDate);
          nextDate.setMinutes(currentDate.getMinutes() + 20);
          const currentNewFormatMin =
            currentDate.getMinutes() === 0
              ? `00`
              : currentDate.getMinutes();
          const nextNewFormatMin =
            nextDate.getMinutes() === 0 ? `00` : nextDate.getMinutes();

          const currentNewFormatHour =
            currentDate.getHours() < 10
              ? `0${currentDate.getHours()}`
              : currentDate.getHours();
          const nextNewFormatHour =
            nextDate.getHours() < 10
              ? `0${nextDate.getHours()}`
              : nextDate.getHours();
          return `${currentNewFormatHour}:${currentNewFormatMin}-${nextNewFormatHour}:${nextNewFormatMin}`;
        });
        aihTimeBlocked = [
          ...new Set([...aihTimeBlocked, ...timeBlocked]),
        ];
        this.timeBlock = DateService.getBlockDate(
          aihTimeBlocks,
          aihTimeBlocked,
        );

        console.log('this.timeBlock', this.timeBlock, data2['Bookings'], timeBlocked);

        // Selected doctor have no any time block => warning
        if (this.timeBlock.length === 0 && this.isLoadTimeFail === false) {
          this.showPopupTheDoctorTimeBlocksIsFull();
        }
      });
  }

  showPopupTheDoctorTimeBlocksIsFull() {
    forkJoin(
      this.translate.get('the_doctors_schedule_is_fully_booked'),
      this.translate.get('select_another_doctor'),
      this.translate.get('select_another_booking_date'),
    ).subscribe(([message, selectDoctor, selectBookingDate]) => {
      Swal.fire({
        text: message,
        customClass: 'schedule-full-warning',
        showCancelButton: true,
        confirmButtonText: selectDoctor,
        cancelButtonText: selectBookingDate,
      }).then(result => {
        if (result.value) {
          setTimeout(() => {
            this.bookingDoctor && this.bookingDoctor.setExpand(true);
          }, 300);
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          setTimeout(() => {
            this.bookingDate && this.bookingDate.expandDate(true);
          }, 300);
        } else {
          this.bookingDate && (this.bookingDate.selectedDate = null);
        }
      });
    });
  }

  animateNextStep() {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        this.animatePhone = false;
        if (!this.selectedPhone || !this.selectedCustomerId) {
          this.animatePhone = true;
          return;
        }

        this.animateClinic = false;
        if (!this.selectedClinic) {
          this.animateClinic = true;
          return;
        }

        this.animateDoctor = false;
        if (!this.selectedDoctor) {
          this.animateDoctor = true;
          return;
        }

        this.animateDate = false;
        if (!this.selectedDate) {
          this.animateDate = true;
          return;
        }

        this.animateTime = false;
        if (!this.selectedTime) {
          this.animateTime = true;
          return;
        }

        this.animateBooking = false;
        if (this.selectedPhone && this.selectedClinic && this.selectedDoctor && this.selectedDate && this.selectedTime) {
          this.animateBooking = true;
          return;
        }
      }, 1000);
    }
  }

  reset() {
    this.animatePhone = false;
    this.animateClinic = false;
    this.animateDoctor = false;
    this.animateDate = false;
    this.animateTime = false;
    this.animateBooking = false;

    this.selectedDoctor = null;
    this.selectedClinic = null;
    this.selectedTime = null;
    this.selectedDate = null;
    this.selectedCustomerId = null;
    this.selectedPhone = null;

    this.bookingPhoneNumer.reset();
    this.bookingDate.reset();
    this.bookingDoctor.reset();
    this.bookingSpecialty.reset();
    this.bookingTime.reset();

    this.recaptcha && this.recaptcha.reset();
  }

  resolved(captchaResponse: string) {
    this.captchaResponse = captchaResponse;
    this.isShowPopupCatcha = false;
    this.callApiBooking();
  }
}
