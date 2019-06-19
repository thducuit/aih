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
  }
}
