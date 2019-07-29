import {
    Component,
    EventEmitter,
    HostListener,
    OnInit,
    Output,
    OnDestroy,
    Input,
} from '@angular/core';
import {Doctor} from '../../models/doctor';
import {UrlService} from '../../services/url.service';
import {DoctorService} from '../../services/doctor.service';
import {TranslateService} from '@ngx-translate/core';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-booking-doctor',
    templateUrl: './booking-doctor.component.html',
    styleUrls: ['./booking-doctor.component.scss'],
})
export class BookingDoctorComponent implements OnInit, OnDestroy {
    public isActive: boolean;
    public chosenDoctor: Doctor;
    public placeholder: string;
    public doctors: Array<Doctor> = [];
    private subscription: Subscription;

    @Input() doctorIds: string[];
    @Output() choose = new EventEmitter<any>();

    constructor(public doctorService: DoctorService,
                private translate: TranslateService,) {
        this.isActive = false;
    }

    ngOnInit() {
        this.loadDoctors();
        this.subscription = this.translate.onLangChange.subscribe(() => {
            this.loadDoctors();
        });
    }

    onClickOutside(e) {
        this.isActive = false;
    }

    setExpand(expand: boolean) {
        this.isActive = expand;
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    loadDoctors() {
        this.doctorService.fetch().subscribe((data: any) => {
            const posts = data.Posts || [];
            this.doctors = posts.map(post => {
                const doctor = new Doctor(post);
                if (doctor.picture) {
                    doctor.picturePath = UrlService.createPictureUrl(doctor.picture);
                }
                doctor.url = UrlService.createDoctorDetailUrl(doctor.alias);
                return doctor;
            });
        });
    }

    filterDoctors() {
        if (!this.doctorIds) {
            return this.doctors;
        }
        return (this.doctors || []).filter(x => {
            return this.doctorIds.indexOf(x.doctorId) >= 0;
        });
    }

    handleExpand($event, doctor) {
        $event.stopPropagation();
        this.doctors.map(item => {
            if (doctor.id !== item.id) {
                item.isExpanded = false;
            }
        });
        doctor.isExpanded = !doctor.isExpanded;
    }

    handleInputClick() {
        this.isActive = true;
    }

    onChoose(doctor) {
        this.chosenDoctor = doctor;
        this.placeholder = doctor.name;
        this.choose.emit(doctor);
        setTimeout(() => {
            this.isActive = false;
        }, 200);
    }
}
