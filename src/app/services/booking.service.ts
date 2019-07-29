import { Injectable } from '@angular/core';
import { RestApiService } from './rest-api.service';
import { environment } from '../../environments/environment';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Injectable()
export class BookingService {


  constructor(private http: RestApiService) {
  }

  callValidatePhone(phone) {
    const url = `api/customer/checkMobileOut?phone=${phone}&secretKey=${environment.secretKey}`;
    const postData = {
      url
    };
    return this.http.post('aih-api', postData);
  }

  callDoctorSchedule() {
    const newDate = new Date();
    const currMonth = newDate.getMonth() + 1;
    const formatCurrMonth = currMonth < 10 ? `0${currMonth}` : `${currMonth}`;
    const currDate = `${newDate.getDate()}/${formatCurrMonth}/${newDate.getFullYear()}`;
    const url = `api/schedule/getlistdoctorscheduleout?curDate=${currDate}`;
    const postData = {
      url
    };
    return this.http.post('aih-api', postData);
  }

  callDateBookingTemp(date) {
    const postData = {
      booking_status: 0,
      from_date: `${date} 00:00:00`,
      to_date: `${date} 23:59:59`,
      rowperpage: 999,
      pageselected: 1
    };
    return this.http.post('booking/list', postData);
  }

  callDateBooking(empId, curDate) {
    const url = `api/booking/loadTimeBlock?empId=${empId}&clinicId=&curDate=${curDate}`;
    const postData = {
      url
    };
    return this.http.post('aih-api', postData);
  }

  callRegisterCustomer(form) {
    const newMonth = parseInt(form.monthBirth, 10) < 0 ? `0${form.monthBirth}` : form.monthBirth;
    const newDay = parseInt(form.dayBirth, 10) < 0 ? `0${form.dayBirth}` : form.dayBirth;
    const postData = {
      customer_full_name: `${form.firstName} ${form.lastName}`,
      customer_gender: form.sex,
      customer_day_of_birth: `${form.yearBirth}-${newMonth}-${newDay}`,
      customer_email: form.email,
      customer_country: form.country,
      customer_phone: form.phone,
    };
    return this.http.post('customer/register', postData);
  }

  callGetExistedCustomer(phone) {
    const postData = {
      customer_phone: phone
    };
    return this.http.post('customer/detail', postData);
  }

  callBooking(clinicId, doctorId, date: NgbDateStruct, time, phone) {
    const monthStr = date.month < 10 ? `0${date.month}` : String(date.month);
    const dayStr = date.month < 10 ? `0${date.day}` : String(date.day);
    const postData = {
      booking_clinic_id: clinicId,
      booking_emp_id: doctorId,
      booking_datetime: `${date.year}-${monthStr}-${dayStr} ${time}:00`,
      booking_description: '',
      customer_phone: phone,
      booking_lang: 'vi-VN',
    };
    return this.http.post('booking/add', postData);
  }

  callUpdateBooking(customerId, bookingId) {
    const postData = {
      customer_id: customerId,
      booking_id: bookingId
    };
    return this.http.post('customer/update-booking', postData);
  }

}
