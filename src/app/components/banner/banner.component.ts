import { Component, OnInit, ViewChild, ElementRef, Input, AfterContentInit } from '@angular/core';
import { LoaderService } from '../../services/loader-service';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss'],
})
export class BannerComponent implements OnInit, AfterContentInit {
  slideConfig = {
    slideToShow: 1,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  @Input()
  public banners: any[];

  @ViewChild('bannerHome', { static: false }) bannerHome: ElementRef;

  constructor(private loaderService: LoaderService) {}

  ngOnInit() {
    this.loaderService.show();
  }

  ngAfterContentInit() {
    this.loaderService.hide();
  }

  slickInit(e) {
    this.bannerHome.nativeElement.style.opacity = 1;
  }

  trackBannerUrl(banner) {
    return banner.Url;
  }
}
