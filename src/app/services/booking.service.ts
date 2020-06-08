import { Injectable } from '@angular/core';
import { RestApiService } from './rest-api.service';
import { environment } from '../../environments/environment';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { stringPadStart } from '../utilities';
import { Share } from '../decorators/share';

@Injectable()
export class BookingService {
  constructor(private http: RestApiService) {}

  callValidatePhone(phone) {
    const url = `api/customer/checkMobileOut?phone=${phone}&secretKey=${environment.secretKey}`;
    const postData = {
      url,
    };
    return this.http.post('aih-api', postData);
  }

  callDoctorSchedule() {
    const newDate = new Date();
    const formatCurrDate = stringPadStart(String(newDate.getDate()), 2, '0');
    const formatCurrMonth = stringPadStart(
      String(newDate.getMonth() + 1),
      2,
      '0',
    );
    const currDate = `${formatCurrDate}/${formatCurrMonth}/${newDate.getFullYear()}`;
    const url = `api/schedule/getlistdoctorscheduleout?curDate=${currDate}`;
    const postData = {
      url,
    };
    return this.http.post('aih-api', postData);
  }

  @Share()
  callDoctorScheduleFromTq() {
    return this.http.get('aih-data');
  }

  callDateBookingTemp(doctorId, date, isOffline) {
    const postData = {
      booking_date: `${date} 00:00:00`,
      booking_emp_id: doctorId,
      offline: isOffline,
    };
    return this.http.post('booking/time-block', postData);
  }

  callDateBooking(empId, curDate: NgbDateStruct) {
    const dateFormatted = `${stringPadStart(
      String(curDate.day),
      2,
      '0',
    )}/${stringPadStart(String(curDate.month), 2, '0')}/${curDate.year}`;
    const url = `api/booking/loadTimeBlock?empId=${empId}&clinicId=&curDate=${dateFormatted}`;
    const postData = {
      url,
    };
    return this.http.post('aih-api', postData);
  }

  callRegisterCustomer(form) {
    const newMonth =
      parseInt(form.monthBirth, 10) < 0
        ? `0${form.monthBirth}`
        : form.monthBirth;
    const newDay =
      parseInt(form.dayBirth, 10) < 0 ? `0${form.dayBirth}` : form.dayBirth;
    const postData = {
      customer_full_name: `${form.firstName} ${form.lastName}`,
      customer_first_name: form.firstName,
      customer_last_name: form.lastName,
      customer_gender: form.sex,
      customer_email: form.email,
      customer_phone: form.phone,
      customer_address: form.residenceAddress,
      customer_passport_id: form.passport,
      customer_passport_no: form.passportNo,
      customer_religion: form.religion,
      customer_ethnic: form.ethnic,
      customer_marital_status: form.martialStatus,
      customer_other: form.other,
      customer_residence_address: form.residenceAddress,
      customer_province: form.province,
      customer_district: form.district,
      customer_residence_address2: form.residenceAddress2,
      customer_tel: form.tel,
      customer_fullname_emergency: form.fullNameEmergency,
      customer_relationship: form.relationship,
      customer_tel_relationship: form.telRelationship,
      customer_mobile_relationship: form.mobileRelationship,
      customer_request_emergency: form.requestEmergency,
      customer_fullname_guardian: form.fullNameGuardian,
      customer_tel_guardian: form.telGuardian,
      customer_mobile_guardian: form.mobileGuardian,
      customer_request_emergency2: form.requestGuardian,
      customer_insurrance_company: form.insuranceCompany,
      customer_card_number: form.insuranceCard,
      customer_guarantee: form.guarantee,
      customer_occupation: form.occupation,
      customer_other_information: form.insuranceOther,
    };

    if (form.country) {
      postData['customer_country'] = form.country;
    }
    if (form.dayBirth && form.monthBirth && form.yearBirth) {
      postData[
        'customer_day_of_birth'
      ] = `${form.yearBirth}-${newMonth}-${newDay}`;
    }

    return this.http.post('customer/register', postData);
  }

  callGetExistedCustomer(phone) {
    const postData = {
      customer_phone: phone,
    };
    return this.http.post('customer/detail', postData);
  }

  callBooking(clinicId, doctorId, date: NgbDateStruct, time, phone) {
    const monthStr = stringPadStart(String(date.month), 2, '0');
    const dayStr = stringPadStart(String(date.day), 2, '0');
    const timeStr = stringPadStart(String(time), 5, '0'); // Should be HH:mm
    const postData = {
      booking_clinic_id: clinicId,
      booking_emp_id: doctorId,
      booking_datetime: `${date.year}-${monthStr}-${dayStr} ${timeStr}:00`,
      booking_description: '',
      customer_phone: phone,
      booking_lang: 'vi-VN',
    };
    return this.http.post('booking/add', postData);
  }

  callUpdateBooking(customerId, bookingId) {
    const postData = {
      customer_id: customerId,
      booking_id: bookingId,
    };
    return this.http.post('customer/update-booking', postData);
  }
}
