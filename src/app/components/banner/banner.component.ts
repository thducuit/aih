import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss'],
})
export class BannerComponent implements OnInit {
  slices: {
    large: string;
    small?: string;
    url?: string;
  }[];
  slideConfig = {
    slideToShow: 1,
    autoplay: true,
    autoplaySpeed: 5000
  };

  @Input()
  public banners: Array<any>;

  @ViewChild('bannerHome', { static: false }) bannerHome: ElementRef;

  constructor() {
    // this.slices = [
    //   {
    //     large: '/assets/storage/2018/06/banner-home1530351518.jpg',
    //     small: '/storage/2018/06/banner-home-mb1530351518.jpg',
    //     url: '#',
    //   },
    //   {
    //     large: '/assets/storage/2018/11/pc-1921x7311542872322.jpg',
    //     small: '/storage/2018/10/mb-640x434-18-101539854534.png',
    //     url: '#',
    //   },
    //   {
    //     large: '/assets/storage/2019/03/vn1551504719.jpg',
    //     small: '/storage/2019/03/mb-vn1551504730.jpg',
    //     url: '/patient-services/insurance',
    //   },
    //   {
    //     large: '/assets/storage/2019/03/goi-dich-vu-jpg-vn1553920231.jpg',
    //     small: '/storage/2019/03/emergency-service-640x434-vn1553920232.jpg',
    //     url: '/patient-services/medical-package',
    //   },
    //   {
    //     large: '/assets/storage/2019/06/1921-x-7311560233872.jpg',
    //     small: '/storage/2019/06/684-x-4411560233914.jpg',
    //     url: '/news/detail/411-prenatal-class-30th-june-2019-at-aih',
    //   },
    //   {
    //     large: '/assets/storage/2019/06/1921-x-7311560765382.jpg',
    //     small: '/storage/2019/06/640-x-4341560765393.jpg',
    //     url: '#',
    //   },
    //   {
    //     large: '/assets/storage/2018/06/banner-home-21530351885.jpg',
    //     small: '/storage/2018/06/banner-home-mb-21530351885.jpg',
    //     url: '#',
    //   },
    //   {
    //     large: '/assets/storage/2018/11/dignity-pc-1921x731-vn1542961166.jpg',
    //     small: '/storage/2018/11/mb-640x4341541588971.jpg',
    //     url: '#',
    //   },
    //   {
    //     large: '/assets/storage/2018/11/emergency-service-vn1542961167.png',
    //     small: '/storage/2018/10/emergency-service-640x434-pc1539849579.png',
    //     url: '#',
    //   },
    //   {
    //     large: '/assets/storage/2018/06/banner-home1530351518.jpg',
    //     small: '/storage/2018/06/banner-home-mb1530351518.jpg',
    //     url: '#',
    //   },
    //   {
    //     large: '/assets/storage/2018/11/pc-1921x7311542872322.jpg',
    //     small: '/storage/2018/10/mb-640x434-18-101539854534.png',
    //     url: '#',
    //   },
    // ];
  }

  ngOnInit() {
    if (this.banners) {
      this.slices = this.banners;
      console.log(this.banners);
    }
  }

  slickInit(e) {
    this.bannerHome.nativeElement.style.opacity = 1;
  }
}
