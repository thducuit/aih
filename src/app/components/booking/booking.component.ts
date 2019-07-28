import { Component, OnInit, Inject, PLATFORM_ID, HostListener, NgZone, AfterViewInit } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import jquery from 'jquery';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements AfterViewInit, OnInit {
  private isBrowser = false;

  constructor(
    @Inject(PLATFORM_ID) platformId,
    private zone: NgZone
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngAfterViewInit() {
    this.isBrowser && setTimeout(() => {
      this.scrollHeader();
    }, 300);
  }

  @HostListener('window:scroll', ['$event'])
  scrollHeader() {
    if (this.isBrowser) {
      this.zone.runOutsideAngular(() => {
        const scrollTop = jquery(window).scrollTop();
        if (1024 < jquery(window).innerWidth()) {
          // This hack to make bookinghome work for home page, other pages is work by stickyThing directy
          if (jquery('#pHome').length) {
            scrollTop >= jquery('.doctor-home').offset().top
              ? jquery('header').addClass('fixHd')
              : jquery('header').removeClass('fixHd');
          }
        } else {
          1 <= scrollTop
            ? jquery('header').addClass('fixHd')
            : jquery('header').removeClass('fixHd');
        }
      });
    }
  }

  ngOnInit(): void {
  }
}
