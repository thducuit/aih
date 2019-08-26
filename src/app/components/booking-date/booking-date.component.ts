import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {
  NgbDateStruct,
  NgbCalendar,
  NgbDate,
} from '@ng-bootstrap/ng-bootstrap';
import moment from 'moment';
import { momentToNgbDate, stringPadStart, maxMomentToNgbDate } from 'src/app/utilities';
import {
  trigger,
  state,
  style,
  transition,
  animate,
  group,
} from '@angular/animations';

@Component({
  selector: 'app-booking-date',
  templateUrl: './booking-date.component.html',
  styleUrls: ['./booking-date.component.scss'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ 'max-height': 0 }),
        animate(300, style({ 'max-height': '500px' })),
      ]),
      transition(':leave', [
        style({ 'max-height': '500px' }),
        animate(500, style({ 'max-height': 0 })),
      ]),
    ]),
  ],
})
export class BookingDateComponent implements OnInit {
  selectedDate: NgbDateStruct;
  expanded = false;
  @Input() doctorSchedule: any;
  @Input() animateAfter: boolean;
  @Output() changeDate = new EventEmitter<NgbDateStruct>();
  public isDisabled: any;

  public disableDays = [];

  constructor(private calendar: NgbCalendar) {}

  ngOnInit(): void {
    this.reset();
  }

  toggleExpandDate() {
    this.expanded = !this.expanded;
  }

  expandDate(expand: boolean) {
    this.expanded = expand;
  }

  onDateSelect(date: NgbDateStruct) {
    this.expanded = false;
    this.selectedDate = date;
    this.changeDate.emit(date);
  }

  onClickOutSide(e) {
    this.expanded = false;
  }

  getDateString() {
    const date = this.selectedDate;
    return date
      ? `${stringPadStart(String(date.day), 2, '0')}-${stringPadStart(
          String(date.month),
          2,
          '0',
        )}-${date.year}`
      : '';
  }

  getMinDate(): NgbDateStruct {
    return momentToNgbDate(moment());
  }

  getMaxDate(): NgbDateStruct {
      return maxMomentToNgbDate(moment());
  }

  getMarkDisableDate() {
    return (date: NgbDate) => {
      const rs = this.disableDays.find(item => {
        return item.year === date.year && item.month === date.month && item.day === date.day;
      });
      return this.calendar.getWeekday(date) > 6 || rs;
    };
  }

  handleDisableDays(offs) {
    this.disableDays = offs.map(item => {
      return momentToNgbDate(item);
    });
  }

  reset() {
    this.selectedDate = null;
    // let defaultDate = moment();
    // If Sunday then choose next day => Monday
    // if (defaultDate.day() === 0) {
    //   defaultDate = defaultDate.add(1, 'days');
    // }

    // this.onDateSelect(momentToNgbDate(defaultDate));
  }
}
