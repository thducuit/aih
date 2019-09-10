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
import { Subscription, forkJoin, Subject } from 'rxjs';
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
import { stringPadStart, ngbDateStructToString } from 'src/app/utilities';
import { debounceTime } from 'rxjs/operators';

const DaysOfWeek = ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'];

@Component({
  selector: 'app-section-booking-home',
  templateUrl: './section-booking-home.component.html',
  styleUrls: ['./section-booking-home.component.scss'],
})
export class SectionBookingHomeComponent
  implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('frmBooking', { static: false }) frmBooking: ElementRef;
  private isBrowser: boolean;
  private subscription: Subscription;

  private resizeSubject = new Subject();
  private resizeSubscription = this.resizeSubject
    .pipe(debounceTime(200))
    .subscribe(() => {
      this.dectectH();
    });

  constructor(
    @Inject(PLATFORM_ID) platformId,
    private translate: TranslateService,
    private zone: NgZone,
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit() {
    this.subscription = this.translate.onLangChange.subscribe(() => {
      this.dectectH();
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    if (this.resizeSubscription) {
      this.resizeSubscription.unsubscribe();
    }
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.dectectH();
    }, 500);
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.resizeSubject.next();
  }

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
