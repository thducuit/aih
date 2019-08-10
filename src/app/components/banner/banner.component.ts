import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss'],
})
export class BannerComponent implements OnInit {
  slideConfig = {
    slideToShow: 1,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  @Input()
  public banners: any[];

  @ViewChild('bannerHome', { static: false }) bannerHome: ElementRef;

  constructor() {}

  ngOnInit() {
  }

  slickInit(e) {
    this.bannerHome.nativeElement.style.opacity = 1;
  }

  trackBannerUrl(banner) {
    return banner.Url;
  }
}
