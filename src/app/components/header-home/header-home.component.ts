import {
  Component,
  OnInit,
  HostListener,
  AfterViewInit,
  NgZone,
} from '@angular/core';
import jquery from 'jquery';

@Component({
  selector: 'app-header-home',
  templateUrl: './header-home.component.html',
  styleUrls: ['./header-home.component.scss'],
})
export class HeaderHomeComponent implements OnInit, AfterViewInit {
  constructor(private zone: NgZone) {}

  ngOnInit() {}

  ngAfterViewInit(): void {
    this.scrollHeader();
  }

  @HostListener('window:scroll', ['$event'])
  scrollHeader() {
    this.zone.runOutsideAngular(() => {
      let scrollTop: number;
      if (1024 < jquery(window).innerWidth()) {
        scrollTop = jquery(window).scrollTop();
        const posHd = $('.bookingwrap-hd').offset().top;
        jquery('#pHome').length
          ? scrollTop >= jquery('.doctor-home').offset().top
            ? jquery('header').addClass('fixHd')
            : jquery('header').removeClass('fixHd')
          : posHd <= scrollTop
          ? jquery('header').addClass('fixHd')
          : jquery('header').removeClass('fixHd');
      } else {
        scrollTop = jquery(window).scrollTop();
        1 <= scrollTop
          ? jquery('header').addClass('fixHd')
          : jquery('header').removeClass('fixHd');
      }
    });
  }
}
