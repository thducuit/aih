import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { throttleTime } from 'rxjs/operators';
import { BookingService } from "../../services/booking.service";

@Component({
  selector: 'app-booking-phone-number',
  templateUrl: './booking-phone-number.component.html',
  styleUrls: ['./booking-phone-number.component.scss']
})
export class BookingPhoneNumberComponent implements OnInit {
  public phoneNumber: string;

  constructor(
    public bookingService: BookingService
  ) { }

  ngOnInit() {
  }

  onChange() {
    console.log('this.phoneNumber', this.phoneNumber);
    if (this.phoneNumber.length === 10) {
      this.bookingService
        .callValidatePhone(this.phoneNumber)
        .subscribe((data: any) => {
          const status = data['Data'] || null;
          if (status === 'false') {
            // open popup
          }
        });
    }
    const source = interval(1000);
    const pipe = source.pipe(throttleTime(2000));
    const subscribe = pipe.subscribe(val => { });
  }

}
