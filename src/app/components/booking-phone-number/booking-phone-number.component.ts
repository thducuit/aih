import {Component, EventEmitter, OnInit, Output, Input} from '@angular/core';
import {BookingService} from '../../services/booking.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-booking-phone-number',
    templateUrl: './booking-phone-number.component.html',
    styleUrls: ['./booking-phone-number.component.scss'],
})
export class BookingPhoneNumberComponent implements OnInit {
    public phoneNumber: string;
    public showRegister = false;
    @Output() chooseCustomer = new EventEmitter<any>();
    @Output() chooseCustomerPhone = new EventEmitter<any>();
    @Input() animateAfter: boolean;

    constructor(public bookingService: BookingService) {
    }

    ngOnInit() {
    }

    openAlert() {
        Swal.fire({
            title: 'Thông báo',
            text: 'Vui lòng đăng ký tài khoản bằng cách bấm chuột vào nút Đăng ký',
            type: 'info',
            confirmButtonText: 'Đăng ký',
        }).then(result => {
            if (result.value) {
                this.showRegister = true;
            }
        });
    }

    onChange() {
        if (this.phoneNumber && this.phoneNumber.length >= 10) {
            this.bookingService
                .callValidatePhone(this.phoneNumber)
                .subscribe((data: any) => {
                    const status = data['Data'] || null;
                    if (status === 'false') {
                        this.bookingService
                            .callGetExistedCustomer(this.phoneNumber)
                            .subscribe((data2: any) => {
                                const customer = data2['Customer'] || {};
                                if (!customer['customer_id']) {
                                    this.openAlert();
                                } else {
                                    this.chooseCustomer.emit(customer['customer_id']);
                                    this.chooseCustomerPhone.emit(this.phoneNumber);
                                }
                            });
                    } else {
                        this.chooseCustomer.emit(-1);
                        this.chooseCustomerPhone.emit(this.phoneNumber);
                    }
                });
        }
        // const source = interval(1000);
        // const pipe = source.pipe(throttleTime(2000));
        // const subscribe = pipe.subscribe(val => {});
    }

    handleCloseRegister() {
        this.showRegister = false;
    }

    handleGetCustomerId(customerId) {
        this.chooseCustomer.emit(customerId);
        this.chooseCustomerPhone.emit(this.phoneNumber);
    }

    reset() {
        this.phoneNumber = '';
    }

}
