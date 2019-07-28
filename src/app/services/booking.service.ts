import { Injectable } from '@angular/core';
import { RestApiService } from './rest-api.service';
import { environment } from '../../environments/environment';

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

}
