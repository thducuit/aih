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
} from '@angular/core';
import jquery from 'jquery';
import { TranslateService } from '@ngx-translate/core';
import { isPlatformBrowser } from '@angular/common';
import { iif } from 'rxjs';

@Component({
  selector: 'app-section-booking-home',
  templateUrl: './section-booking-home.component.html',
  styleUrls: ['./section-booking-home.component.scss'],
})
export class SectionBookingHomeComponent implements OnInit, AfterViewInit {
  @ViewChild('frmBooking', { static: false }) frmBooking: ElementRef;
  private isBrowser: boolean;

  constructor(
    @Inject(PLATFORM_ID) private platformId,
    private translate: TranslateService,
    private zone: NgZone,
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit() {
    this.translate.onLangChange.subscribe(() => {
      this.dectectH();
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.dectectH();
    }, 500);
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
