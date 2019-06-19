import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import jquery from 'jquery';

@Component({
  selector: 'app-section-booking-home',
  templateUrl: './section-booking-home.component.html',
  styleUrls: ['./section-booking-home.component.css'],
})
export class SectionBookingHomeComponent implements OnInit {
  @ViewChild('frmBooking', { static: false }) frmBooking: ElementRef;

  constructor() {}

  ngOnInit() {
    jquery(document).ready(() => {
      this.dectectH();
    });
    jquery(window).resize(() =>{
      this.dectectH();
    });
  }

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
