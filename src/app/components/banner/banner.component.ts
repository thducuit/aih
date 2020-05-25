import {Component, OnInit, ViewChild, ElementRef, Input, AfterContentInit, Inject, PLATFORM_ID} from '@angular/core';
import {LoaderService} from '../../services/loader-service';
import {isPlatformBrowser} from '@angular/common';
import {DeviceDetectorService} from 'ngx-device-detector';

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

    private deviceInfo = null;
    public isMobile;
    public isTablet;
    public isDesktopDevice;

    @Input()
    public banners: any[];

    @ViewChild('bannerHome', {static: false}) bannerHome: ElementRef;

    constructor(@Inject(PLATFORM_ID) private platformId,
                private deviceService: DeviceDetectorService,
                private loaderService: LoaderService) {
        if (isPlatformBrowser(this.platformId)) {
            this.checkDevice();
        }
    }

    checkDevice() {
        this.deviceInfo = this.deviceService.getDeviceInfo();
        this.isMobile = this.deviceService.isMobile();
        this.isTablet = this.deviceService.isTablet();
        this.isDesktopDevice = this.deviceService.isDesktop();
    }

    ngOnInit() {}

    ngAfterContentInit() {}

    slickInit(e) {
        this.bannerHome.nativeElement.style.opacity = 1;
    }

    trackBannerUrl(banner) {
        return banner.Url;
    }

    onBeforeChange(e) {
        this.banners.map((item) => {
            item.showContent = true;
            return item;
        });
    }
}
