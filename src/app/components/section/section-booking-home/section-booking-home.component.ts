import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  HostListener,
  AfterViewInit,
  NgZone,
  Inject,
  PLATFORM_ID,
  OnDestroy,
} from '@angular/core';
import jquery from 'jquery';
import moment from 'moment';
import { TranslateService } from '@ngx-translate/core';
import { isPlatformBrowser } from '@angular/common';
import { Subscription, forkJoin } from 'rxjs';
import { BookingService } from '../../../services/booking.service';
import { Schedule } from '../../../models/schedule';
import { Doctor } from '../../../models/doctor';
import { Clinic } from '../../../models/clinic';
import { DateService } from '../../../services/date.service';
import Swal from 'sweetalert2';
import { BookingDateComponent } from '../../booking-date/booking-date.component';
import { BookingDoctorComponent } from '../../booking-doctor/booking-doctor.component';
import { BookingSpecialtyComponent } from '../../booking-specialty/booking-specialty.component';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { stringPadStart } from 'src/app/utilities';

@Component({
  selector: 'app-section-booking-home',
  templateUrl: './section-booking-home.component.html',
  styleUrls: ['./section-booking-home.component.scss'],
})
export class SectionBookingHomeComponent
  implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('frmBooking', { static: false }) frmBooking: ElementRef;
  @ViewChild('bookingDate', { static: false })
  bookingDate: BookingDateComponent;
  @ViewChild('bookingDoctor', { static: false })
  bookingDoctor: BookingDoctorComponent;
  @ViewChild('bookingSpecialty', { static: false })
  bookingSpecialty: BookingSpecialtyComponent;
  private isBrowser: boolean;
  public schedule: Schedule[];
  public doctorSchedule: Schedule;
  public selectedDoctor: Doctor;
  public selectedClinic: Clinic;
  public selectedTime: any;
  public selectedDate: NgbDateStruct;
  public selectedCustomerId: any;
  public selectedPhone: any;
  public timeBlock = [];
  private subscription: Subscription;

  constructor(
    @Inject(PLATFORM_ID) private platformId,
    private translate: TranslateService,
    private zone: NgZone,
    public bookingService: BookingService,
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit() {
    this.loadSchedule();
    this.subscription = this.translate.onLangChange.subscribe(() => {
      this.dectectH();
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.dectectH();
    }, 500);
  }

  loadSchedule() {
    this.bookingService.callDoctorSchedule().subscribe((data: any) => {
      if (data['Data']) {
        const schedule = JSON.parse(data['Data']);
        this.schedule = schedule.map(item => {
          return new Schedule(item);
        });
      }
    });
  }

  handleSelectDoctor(doctor: Doctor) {
    this.selectedDoctor = doctor;
    this.doctorSchedule = this.schedule.find(x => {
      return x.doctorId === doctor.doctorId;
    });

    this.bookingSpecialty &&
      this.bookingSpecialty.chooseByClinicId(this.doctorSchedule.clinicId);

    if (this.selectedDate) {
      this.loadTime(this.selectedDoctor.doctorId, this.selectedDate);
    }
  }

  handleSelectDate(date: NgbDateStruct) {
    this.selectedDate = date;
    if (this.selectedDoctor) {
      this.loadTime(this.selectedDoctor.doctorId, date);
    }
  }

  handleSelectTime(time) {
    this.selectedTime = time;
  }

  handleSelectCustomerId(customerId) {
    this.selectedCustomerId = customerId;
  }

  handleSelectClinic(clinic) {
    this.selectedClinic = clinic;
  }

  filterAvailableDoctors() {
    if (!this.schedule || (!this.selectedClinic && !this.selectedDate)) {
      return null; // This will enable all doctors
    }
    const selectedDate = this.selectedDate;
    const currentDate = selectedDate
      ? moment(
          `${selectedDate.year}-${stringPadStart(
            String(selectedDate.month),
            2,
            '0',
          )}-${stringPadStart(String(selectedDate.day), 2, '0')}T00:00:00`,
        )
      : null;
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
        }
        return result;
      })
      .map(x => {
        return x.doctorId;
      });
    return doctorIds;
  }

  handleSelectCustomerPhone(phone) {
    this.selectedPhone = phone;
  }

  handleBooking() {
    this.bookingService
      .callBooking(
        this.selectedClinic.clinicId,
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
          }
        } else {
          this.bookingService
            .callUpdateBooking(this.selectedCustomerId, bookingId)
            .subscribe((data2: any) => {
              this.openSuccess();
            });
        }
      });
  }

  openSuccess() {
    Swal.fire({
      title: 'Success!',
      text: 'Quý khách đã Đặt lịch thành công',
      type: 'success',
      confirmButtonText: 'OK',
    });
  }

  loadTime(doctorId, selectedDate: NgbDateStruct) {
    this.bookingService
      .callDateBooking(doctorId, selectedDate)
      .subscribe((data: any) => {
        const response = data['Data'] || '';
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
          const newDate = `${selectedDate.year}-${stringPadStart(
            String(selectedDate.month),
            2,
            '0',
          )}-${stringPadStart(String(selectedDate.day), 2, '0')}`;
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
                return `${currentDate.getHours()}:${currentNewFormatMin}-${nextDate.getHours()}:${nextNewFormatMin}`;
              });
              aihTimeBlocked = [
                ...new Set([...aihTimeBlocked, ...timeBlocked]),
              ];
              this.timeBlock = DateService.getBlockDate(
                aihTimeBlocks,
                aihTimeBlocked,
              );
              // Selected doctor have no any time block => warning
              if (!this.timeBlock.length) {
                this.showPopupTheDoctorTimeBlocksIsFull();
              }
            });
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

  @HostListener('window:resize', ['$event'])
  dectectH() {
    if (this.isBrowser) {
      this.zone.runOutsideAngular(() => {
        let t = 0;
        const containerElement = this.frmBooking
          ? this.frmBooking.nativeElement
          : document;
        return (
          jquery('.booking-wrap .item > p', containerElement).css({
            height: 'auto',
          }),
          jquery('.booking-wrap .item', containerElement).each(function() {
            const e = $(this)
              .find('.dt-h')
              .innerHeight();
            t < e && (t = e);
          }),
          jquery('.booking-wrap .item > p', containerElement).css({
            height: t,
          }),
          !1
        );
      });
    }
  }
}
