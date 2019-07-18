import { Component, OnInit } from '@angular/core';
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-booking-date',
  templateUrl: './booking-date.component.html',
  styleUrls: ['./booking-date.component.scss'],
})
export class BookingDateComponent {
  selectedDate: NgbDateStruct;
  expanded = false;

  constructor() {}

  toggleExpandDate() {
    this.expanded = !this.expanded;
  }

  onDateSelect(date: NgbDateStruct) {
    this.expanded = false;
  }

  getDateString() {
    const date = this.selectedDate;
    return date ? `${date.day}-${date.month}-${date.year}` : '';
  }
}
