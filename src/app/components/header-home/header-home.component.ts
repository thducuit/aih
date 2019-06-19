import { Component, OnInit } from '@angular/core';
import jquery from 'jquery';

@Component({
  selector: 'app-header-home',
  templateUrl: './header-home.component.html',
  styleUrls: ['./header-home.component.css'],
})
export class HeaderHomeComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    this.scrollHeader();
    jquery(window).scroll(e => {
      this.scrollHeader();
    });
  }
  scrollHeader() {
    let e;
    if (1024 < jquery(window).innerWidth()) {
      e = jquery(window).scrollTop();
      const posHd = $('.bookingwrap-hd').offset().top;
      jquery('#pHome').length
        ? e >= jquery('.doctor-home').offset().top
          ? jquery('header').addClass('fixHd')
          : jquery('header').removeClass('fixHd')
        : posHd <= e
        ? jquery('header').addClass('fixHd')
        : jquery('header').removeClass('fixHd');
    } else {
      e = jquery(window).scrollTop();
      1 <= e
        ? jquery('header').addClass('fixHd')
        : jquery('header').removeClass('fixHd');
    }
  }
}
