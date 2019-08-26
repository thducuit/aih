import {
    Component,
    EventEmitter,
    HostListener,
    OnInit,
    Output,
    OnDestroy,
    Input,
} from '@angular/core';
import {Clinic} from '../../models/clinic';
import {ClinicService} from 'src/app/services/clinic.service';
import {TranslateService} from '@ngx-translate/core';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-booking-specialty',
    templateUrl: './booking-specialty.component.html',
    styleUrls: ['./booking-specialty.component.scss'],
})
export class BookingSpecialtyComponent implements OnInit, OnDestroy {
    public isActive: boolean;
    public chosenClinic: Clinic;
    public placeholder: string;
    public clinics: Array<Clinic> = [];
    private subscription: Subscription;
    @Input() animateAfter = false;
    @Output() chooseClinic = new EventEmitter<any>();

    constructor(public clinicService: ClinicService,
                private translate: TranslateService) {
        this.isActive = false;
    }

    ngOnInit() {
        this.loadClinics();
        this.subscription = this.translate.onLangChange.subscribe(() => {
            this.loadClinics();
        });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    onClickOutside(e) {
        this.isActive = false;
    }

    loadClinics() {
        this.clinicService.fetch().subscribe((data: {}) => {
            const posts = data['Categories'] || [];
            this.clinics = posts.map(post => new Clinic(post));
        });
    }

    handleInputClick() {
        this.isActive = true;
    }

    onChoose(clinic) {
        this.chosenClinic = clinic;
        this.chooseClinic.emit(clinic);
        setTimeout(() => {
            this.isActive = false;
        }, 200);
    }

    chooseByClinicId(clinicId) {
        const found = (this.clinics || []).find(x => {
            return x.clinicId === clinicId;
        });
        if (found) {
            this.onChoose(found);
        }
    }

    filterClinicByDoctor(doctor) {
        const found = (this.clinics || []).find(x => {
            const postHis = doctor.meta.his_clinic_ids || [];
            const catHis = x.meta.his_clinic_ids || [];
            return  x.id === doctor.categoryId || doctor.categories.indexOf(x.id) >= 0 || postHis.some(r => catHis.indexOf(r) >= 0);
        });
        if (found) {
            this.onChoose(found);
        }
    }

    get clinicName() {
        if (!this.chosenClinic) {
            return '';
        }
        return this.chosenClinic.name;
    }

    reset() {
        this.chosenClinic = null;
    }
}
