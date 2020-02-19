import { Component, OnInit, ViewChild, ElementRef, Input, AfterContentInit } from '@angular/core';
import { LoaderService } from '../../services/loader-service';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss'],
})
export class BannerComponent {
  slideConfig = {
    slideToShow: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    lazyLoad: 'ondemand'
  };

  @Input()
  public banners: any[];

  @ViewChild('bannerHome', { static: false }) bannerHome: ElementRef;

  constructor() {}

  beforeSlideChange(e) {
    this.banners[e.currentSlide] && (this.banners[e.currentSlide].deferLoaded = true);
  }

  slickInit(e) {
    this.bannerHome.nativeElement.style.opacity = 1;
  }

  trackBannerUrl(inx, banner) {
    return banner.large;
  }
}
