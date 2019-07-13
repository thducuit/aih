import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  HostListener,
  AfterViewInit,
} from '@angular/core';
import jquery from 'jquery';

@Component({
  selector: 'app-section-booking-home',
  templateUrl: './section-booking-home.component.html',
  styleUrls: ['./section-booking-home.component.scss'],
})
export class SectionBookingHomeComponent implements OnInit, AfterViewInit {
  @ViewChild('frmBooking', { static: false }) frmBooking: ElementRef;

  constructor() {}

  ngOnInit() {}

  ngAfterViewInit(): void {
    this.dectectH();
  }

  @HostListener('window:resize', ['$event'])
  dectectH() {
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
  }
}
