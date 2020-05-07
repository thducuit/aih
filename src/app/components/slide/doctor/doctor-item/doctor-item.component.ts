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
import {Subscription, Subject} from 'rxjs';
import {SlickCarouselComponent} from 'src/app/shared/slick-carousel/slick.component';
import {isPlatformBrowser} from '@angular/common';
import {LoaderService} from '../../../../services/loader-service';
import jquery from 'jquery';
import {debounceTime} from 'rxjs/operators';

@Component({
    selector: 'app-doctor-item',
    templateUrl: './doctor-item.component.html',
    styleUrls: ['./doctor-item.component.scss'],
})
export class DoctorItemComponent implements OnInit, OnDestroy, OnChanges {
    public doctors: Array<Doctor> = [];
    public doctorsPerPage: Array<Doctor> = [];
    public perPage = 4;
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
    private resizeSubject = new Subject();
    private resizeSubscription = this.resizeSubject
        .pipe(debounceTime(200))
        .subscribe(() => {
            this.updateOnWindowResize();
        });

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
        this.subscription = this.translate.onLangChange.subscribe(() => {
            this.loadDoctors();
        });
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
        if (this.resizeSubscription) {
            this.resizeSubscription.unsubscribe();
        }
    }

    sliderInit(e) {
        this.sliderContainer.nativeElement.style.opacity = 1;
    }

    loadDoctors() {
        this.loaderService.show();
        this.doctors = [];
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
                .filter(item => item.picture ? true : false);
            if (this.clinicIds && this.clinicIds.length) {
                this.doctors = this.doctors.filter(
                        item => this.clinicIds.indexOf(item.categoryId) >= 0 || this.clinicIds.some( clinicId => item.categories.indexOf(clinicId) >= 0 )
                );
            } else {
                this.doctors = this.doctors.filter(
                    item => item.hot === true,
                );
            }
            // this.doctorsPerPage = this.doctors.slice(0, 8);
            this.doctors.map((item, index) => {
                if (index < this.perPage) {
                    item.showContent = true;
                }
                return item;
            });
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
        this.resizeSubject.next();
    }

    updateOnWindowResize() {
        if (
            isPlatformBrowser(this.platformId) &&
            jquery(window).width() > 767 &&
            this.slickSlider.$instance &&
            !this.slickSlider.$instance.hasClass('slick-initialized')
        ) {
            this.slickSlider &&
            this.doctors &&
            this.doctors.length &&
            this.slickSlider.initSlick();
        }
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.loadDoctors();
    }

    onAfterChange(e) {
        // this.doctorsPerPage = this.doctors;
    }

    onBeforeChange(e) {
        this.perPage = this.perPage + 4;
        this.doctors.map((item, index) => {
            if (index < this.perPage) {
                item.showContent = true;
                item.showImg = true;
            }
            return item;
        });
    }


}
