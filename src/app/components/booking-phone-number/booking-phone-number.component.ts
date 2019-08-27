import { Component, EventEmitter, OnInit, Output, Input, ViewChild } from '@angular/core';
import { BookingService } from '../../services/booking.service';
import Swal from 'sweetalert2';
import { TranslateService } from '@ngx-translate/core';
import { forkJoin } from 'rxjs';
import { BookingTimeComponent } from '../booking-time/booking-time.component';

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

  @ViewChild('phoneNumberInput', { static: false }) phoneNumberInput;

  public prefixMobile = [
    '032', '070', '091', '056',
    '033', '076', '094', '058',
    '034', '077', '081', '059',
    '035', '078', '082', '092',
    '036', '079', '083', '099',
    '037', '089', '084',
    '038', '090', '085',
    '039', '093', '088',
    '086',
    '096',
    '097',
    '098',
  ];

  public prefixTel = [
    '296', '219', '259',
    '254', '226', '210',
    '209', '024', '257',
    '204', '239', '232',
    '291', '220', '235',
    '222', '225', '255',
    '275', '293', '203',
    '256', '028', '233',
    '274', '218', '299',
    '271', '221', '212',
    '252', '258', '276',
    '290', '297', '227',
    '292', '260', '208',
    '206', '213', '237',
    '236', '263', '234',
    '262', '205', '273',
    '261', '214', '294',
    '215', '272', '207',
    '251', '228', '270',
    '277', '238', '211',
    '269', '229', '216',

  ];

  constructor(public bookingService: BookingService,
              private translate: TranslateService) {
  }

  ngOnInit() {
  }

  openAlert() {
    forkJoin(
      this.translate.get('text_booking_phone_title'),
      this.translate.get('text_booking_phone_content'),
      this.translate.get('text_booking_phone_close'),
    ).subscribe(([titleText, message, buttonText]) => {
      Swal.fire({
        title: titleText,
        text: message,
        type: 'info',
        confirmButtonText: buttonText,
      }).then(result => {
        if (result.value) {
          this.showRegister = true;
        }
      });
    });
  }

  phoneAlert() {
    forkJoin(
      this.translate.get('text_booking_phone_invalid'),
      this.translate.get('text_booking_close'),
    ).subscribe(([message, buttonText]) => {
      Swal.fire({
        text: message,
        type: 'info',
        confirmButtonText: buttonText,
      }).then(result => {
        if (this.phoneNumberInput) {
          this.phoneNumberInput.nativeElement.focus();
        }
      });
    });
  }

  onChange() {

    if (!this.phoneNumber || !this.phoneNumber.length) {
      return;
    }

    if (this.phoneNumber && this.phoneNumber.length === 10) {
      const prefix = this.phoneNumber.substr(0, 3);
      const prefix2 = this.phoneNumber.substr(0, 2);
      if (this.prefixMobile.indexOf(prefix) < 0 && prefix2 !== '24' && prefix2 !== '28') {
        this.phoneAlert();
        return;
      }
    } else if (this.phoneNumber && this.phoneNumber.length === 11) {
      const prefix = this.phoneNumber.substr(0, 3);
      if (this.prefixTel.indexOf(prefix) < 0) {
        this.phoneAlert();
        return;
      }
    } else {
      this.phoneAlert();
      return;
    }

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

  handleCloseRegister() {
    this.showRegister = false;
    // if (this.phoneNumberInput) {
    //   this.phoneNumberInput.nativeElement.focus();
    // }
  }

  handleGetCustomerId(customerId) {
    this.chooseCustomer.emit(customerId);
    this.chooseCustomerPhone.emit(this.phoneNumber);
  }

  reset() {
    this.phoneNumber = '';
  }

}
