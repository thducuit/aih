import {Component, OnInit, Input, Output, OnChanges, EventEmitter, SimpleChanges, OnDestroy} from '@angular/core';
import {BookingService} from '../../../services/booking.service';
import countryJson from './country.json';
import provinceJson from './province.json';
import districtJson from './district.json';

import Swal from 'sweetalert2';
import {forkJoin, Subscription} from 'rxjs';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'app-customer-register',
    templateUrl: './customer-register.component.html',
    styleUrls: ['./customer-register.component.scss'],
})
export class CustomerRegisterComponent implements OnInit, OnChanges, OnDestroy {

    @Input() isShowPopup = false;
    @Input() phoneNumber: string;
    @Output() closePopup = new EventEmitter<any>();
    @Output() getCustomerId = new EventEmitter<any>();
    public form = {
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        sex: 0,
        dayBirth: '',
        monthBirth: '',
        yearBirth: '',
        country: '',
        passport: '',
        passportNo: '',
        martialStatus: '',
        other: '',
        province: '',
        district: '',
        religion: '',
        ethnic: '',
        residenceAddress: '',
        residenceAddress2: '',
        tel: '',

        fullNameEmergency: '',
        telRelationship: '',
        requestEmergency: '',
        relationship: '',
        mobileRelationship: '',

        fullNameGuardian: '',
        telGuardian: '',
        mobileGuardian: '',
        requestGuardian: '',

        insuranceCompany: '',
        insuranceCard: '',
        occupation: '',
        guarantee: '',
        insuranceOther: '',
    };
    public years = [];
    public months = [];
    public days = [];
    public countries = [];
    public provinces = [];
    public districts = [];
    public districtFilters = [];

    public errorFirstName = false;
    public errorLastName = false;
    public errorSex = false;
    public errorEmail = false;
    public errorDayBirth = false;
    public errorMonthBirth = false;
    public errorYearBirth = false;

    public lang;

    private subscription: Subscription;

    constructor(public bookingService: BookingService, private translate: TranslateService) {
    }

    resetForm() {
        this.form = {
            firstName: '',
            lastName: '',
            phone: '',
            email: '',
            sex: 0,
            dayBirth: '',
            monthBirth: '',
            yearBirth: '',
            country: '',

            passport: '',
            passportNo: '',
            martialStatus: '',
            other: '',
            province: '',
            district: '',
            religion: '',
            ethnic: '',
            residenceAddress: '',
            residenceAddress2: '',
            tel: '',

            fullNameEmergency: '',
            telRelationship: '',
            requestEmergency: '',
            relationship: '',
            mobileRelationship: '',

            fullNameGuardian: '',
            telGuardian: '',
            mobileGuardian: '',
            requestGuardian: '',

            insuranceCompany: '',
            insuranceCard: '',
            occupation: '',
            guarantee: '',
            insuranceOther: '',
        };

        this.errorFirstName = false;
        this.errorLastName = false;
        this.errorSex = false;
        this.errorEmail = false;
        this.errorDayBirth = false;
        this.errorMonthBirth = false;
        this.errorYearBirth = false;
    }

    ngOnInit() {
        this.years = [];
        for (let i = 1900; i < 2021; i++) {
            this.years.push(i);
        }
        this.months = [];
        for (let i = 1; i < 13; i++) {
            this.months.push(i);
        }
        this.days = [];
        for (let i = 1; i < 32; i++) {
            this.days.push(i);
        }


        this.subscription = this
            .translate
            .onLangChange
            .subscribe(() => {
                this.lang = this.translate.currentLang;
            });

        this.countries = countryJson;
        this.provinces = provinceJson;
        this.districts = districtJson;

    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    openSuccess() {
        forkJoin(
            this.translate.get('text_register_success'),
            this.translate.get('text_close'),
        ).subscribe(([message, buttonText]) => {
            Swal.fire({
                text: message,
                confirmButtonText: buttonText,
            });
        });
    }

    openFail() {
        forkJoin(
            this.translate.get('text_register_fail'),
            this.translate.get('text_close'),
        ).subscribe(([message, buttonText]) => {
            Swal.fire({
                text: message,
                confirmButtonText: buttonText,
            });
        });
    }

    sendForm() {
        if (!this.validate()) {
            return;
        }
        this.bookingService.callRegisterCustomer(this.form).subscribe((data: any) => {
            if (data['customer_id']) {
                this.getCustomerId.emit(data['customer_id']);
                this.openSuccess();
                this.resetForm();
            } else {
                this.openFail();
            }
            this.handleClosePopup();
        });
    }

    handleClosePopup() {
        this.resetForm();
        this.closePopup.emit();
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.form.phone = this.phoneNumber;
    }

    onChangeProvince() {
        this.districtFilters = this.districts.filter(item => this.form.province === item['province_id']);
    }

    validate() {
        let flag = true;
        if (!this.form.firstName) {
            this.errorFirstName = true;
            flag = false;
        } else {
            this.errorFirstName = false;
        }

        if (!this.form.lastName) {
            this.errorLastName = true;
            flag = false;
        } else {
            this.errorLastName = false;
        }

        if (!this.form.sex) {
            this.errorSex = true;
            flag = false;
        } else {
            this.errorSex = false;
        }

        if (!this.form.dayBirth) {
            this.errorDayBirth = true;
            flag = false;
        } else {
            this.errorDayBirth = false;
        }

        if (!this.form.monthBirth) {
            this.errorMonthBirth = true;
            flag = false;
        } else {
            this.errorMonthBirth = false;
        }

        if (!this.form.yearBirth) {
            this.errorYearBirth = true;
            flag = false;
        } else {
            this.errorYearBirth = false;
        }

        if (this.form.email) {
            const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (!re.test(String(this.form.email).toLowerCase())) {
                this.errorEmail = true;
                flag = false;
            } else {
                this.errorEmail = false;
            }
        }
        return flag;
    }

    onClickOutside(e) {
        // this.handleClosePopup();
    }
}
