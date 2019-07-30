import {Component, OnInit, Input, Output, OnChanges, EventEmitter, SimpleChanges} from '@angular/core';
import {BookingService} from '../../../services/booking.service';
import countryJson from './country.json';

import Swal from 'sweetalert2';
import {forkJoin} from 'rxjs';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'app-customer-register',
    templateUrl: './customer-register.component.html',
    styleUrls: ['./customer-register.component.scss']
})
export class CustomerRegisterComponent implements OnInit, OnChanges {

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
        country: ''
    };
    public years = [];
    public months = [];
    public days = [];
    public countries = [];
    public errorFirstName = false;
    public errorSex = false;
    public errorEmail = false;

    constructor(public bookingService: BookingService, private translate: TranslateService) {
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

        this.countries = countryJson;

    }

    openSuccess() {
        forkJoin(
            this.translate.get('text_register_success'),
            this.translate.get('text_close'),
        ).subscribe(([message, buttonText]) => {
            Swal.fire({
                text: message,
                confirmButtonText: buttonText
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
                confirmButtonText: buttonText
            });
        });
    }

    sendForm() {
        if (!this.form.firstName) {
            this.errorFirstName = true;
            return;
        }
        if (!this.form.sex) {
            this.errorSex = true;
            return;
        }
        if (this.form.email) {
            const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (!re.test(String(this.form.email).toLowerCase())) {
                this.errorEmail = true;
                return;
            }
        }
        this.bookingService.callRegisterCustomer(this.form).subscribe((data: any) => {
            if (data['customer_id']) {
                this.getCustomerId.emit(data['customer_id']);
                this.openSuccess();
            } else {
                this.openFail();
            }
            this.handleClosePopup();
        });
    }

    handleClosePopup() {
        this.closePopup.emit();
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.form.phone = this.phoneNumber;
        if (this.form.firstName) {
            this.errorFirstName = false;
        }
        if (this.form.sex) {
            this.errorSex = false;
        }
    }

    validate() {
        if (this.form.firstName) {
            this.errorFirstName = false;
        }
        if (this.form.sex) {
            this.errorSex = false;
        }
        if (this.form.email) {
            const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (re.test(String(this.form.email).toLowerCase())) {
                this.errorEmail = false;
            }
        }
    }
}
