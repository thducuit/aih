import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {BookingService} from "../../../services/booking.service";
import countryJson from './country.json';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-customer-register',
  templateUrl: './customer-register.component.html',
  styleUrls: ['./customer-register.component.scss']
})
export class CustomerRegisterComponent implements OnInit {

  @Input() isShowPopup = false;
  @Output() closePopup = new EventEmitter<any>();
  @Output() getCustomerId = new EventEmitter<any>();
  public form = {
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    sex: '',
    dayBirth: '',
    monthBirth: '',
    yearBirth: '',
    country: ''
  };
  public years = [];
  public months = [];
  public days = [];
  public countries = [];

  constructor(
    public bookingService: BookingService
  ) {
  }

  ngOnInit() {
    this.years = [];
    for (let i = 1900; i < 2021; i++) {
      this.years.push(i);
    }
    this.months = [];
    for (let i = 1; i < 13; i++) {
      this.years.push(i);
    }
    this.days = [];
    for (let i = 1; i < 32; i++) {
      this.days.push(i);
    }

    this.countries = countryJson;
  }

  openSuccess() {
    Swal.fire({
      title: 'Success!',
      text: 'Bạn đã đăng ký thành công',
      type: 'success',
      confirmButtonText: 'OK'
    });
  }

  openFail() {
    Swal.fire({
      title: 'Error!',
      text: 'Bạn đã đăng ký thất bại vui lòng chọn số điện thoại khác',
      type: 'error',
      confirmButtonText: 'OK'
    });
  }

  sendForm() {
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
}
