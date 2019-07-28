import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {interval} from 'rxjs';
import {throttleTime} from 'rxjs/operators';
import {BookingService} from "../../services/booking.service";
import {TranslateService} from '@ngx-translate/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-booking-phone-number',
  templateUrl: './booking-phone-number.component.html',
  styleUrls: ['./booking-phone-number.component.scss']
})
export class BookingPhoneNumberComponent implements OnInit {
  public phoneNumber: string;
  public showRegister = false;
  @Output() chooseCustomer = new EventEmitter<any>();

  constructor(
    public bookingService: BookingService,
    private translate: TranslateService
  ) {
  }

  ngOnInit() {
  }

  openAlert() {
    Swal.fire({
      title: 'Error!',
      text: 'Bạn chưa có tài khoản',
      type: 'error',
      confirmButtonText: 'OK'
    }).then(result => {
      if (result.value) {
        this.showRegister = true;
      }
    });
  }

  onChange() {
    if (this.phoneNumber && this.phoneNumber.length === 10) {
      this.bookingService.callValidatePhone(this.phoneNumber).subscribe((data: any) => {
        const status = data['Data'] || null;
        if (status === 'false') {
          this.bookingService.callGetExistedCustomer(this.phoneNumber).subscribe((data2: any) => {
            console.log('data2', data2);
            const customer = data2['Customer'] || {};
            if (!customer['customer_id']) {
              this.openAlert();
            } else {
              this.chooseCustomer.emit(customer['customer_id']);
            }
          });
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
    console.log('customerId', customerId);
    this.chooseCustomer.emit(customerId);
  }

}
