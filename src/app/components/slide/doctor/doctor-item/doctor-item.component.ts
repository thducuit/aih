import {
    Component,
    OnInit,
    ViewChild,
    ElementRef,
    OnDestroy,
    HostListener,
    Inject,
    PLATFORM_ID,
    NgZone,
    Input,
    OnChanges,
    SimpleChanges,
} from '@angular/core';
import {DoctorService} from '../../../../services/doctor.service';
import {Doctor} from '../../../../models/doctor';
import {UrlService} from '../../../../services/url.service';
import {TranslateService} from '@ngx-translate/core';
import {Subscription} from 'rxjs';
import {SlickCarouselComponent} from 'ngx-slick-carousel';
import {isPlatformBrowser} from '@angular/common';
import {LoaderService} from '../../../../services/loader-service';

@Component({
    selector: 'app-doctor-item',
    templateUrl: './doctor-item.component.html',
    styleUrls: ['./doctor-item.component.scss'],
})
export class DoctorItemComponent implements OnInit, OnDestroy, OnChanges {
    public doctors: Array<Doctor> = [];

    @Input() isDetail;

    public slideConfig = {
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 4,
        arrows: false,
        autoplay: false,
        autoplaySpeed: 5000,
        responsive: [
            {
                breakpoint: 1023,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                },
            },
            {
                breakpoint: 767,
                settings: 'unslick',
            },
        ],
    };
    private subscription: Subscription;

    @ViewChild('slickModal', {static: true})
    slickSlider: SlickCarouselComponent;

    @ViewChild('sliderContainer', {static: false})
    sliderContainer: ElementRef;

    @Input() clinicIds;

    constructor(@Inject(PLATFORM_ID) private platformId,
                public doctorService: DoctorService,
                private translate: TranslateService,
                private loaderService: LoaderService) {
    }

    ngOnInit() {
        this.loadDoctors();
        this.subscription = this.translate
            .onLangChange
            .subscribe(() => {
                this.loadDoctors();
            });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    sliderInit(e) {
        this.sliderContainer.nativeElement.style.opacity = 1;
    }

    loadDoctors() {
        this.loaderService.show();
        this.doctorService.fetch().subscribe((data: any) => {
            const posts = data.Posts || [];
            this.doctors = posts
                .map(post => {
                    const doctor = new Doctor(post);
                    if (doctor.picture) {
                        doctor.picturePath = UrlService.createPictureUrl(doctor.picture);
                    }
                    doctor.url = UrlService.createDoctorDetailUrl(doctor.alias);
                    return doctor;
                })
                .sort((obj1, obj2) => (obj1.sort >= obj2.sort ? 1 : -1));
            if (this.clinicIds && this.clinicIds.length) {
                this.doctors = this.doctors.filter(item => this.clinicIds.indexOf(item.categoryId) >= 0);
            }

            this.loaderService.hide();
        });
    }

    trackDoctorId(doctor: Doctor) {
        if (!doctor) {
            return null;
        }
        return doctor.id;
    }

    @HostListener('window:resize')
    onWindowResize() {
        if (isPlatformBrowser(this.platformId)) {
            this.slickSlider && this.doctors && this.doctors.length && this.slickSlider.initSlick();
        }
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.loadDoctors();
    }
}
