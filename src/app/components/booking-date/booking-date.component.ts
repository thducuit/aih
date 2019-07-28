import {Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter} from '@angular/core';
import { NgbDateStruct, NgbCalendar, NgbDate} from '@ng-bootstrap/ng-bootstrap';
import {DateService} from '../../services/date.service';
import moment from 'moment';
import { momentToNgbDate } from 'src/app/utilities';

@Component({
  selector: 'app-booking-date',
  templateUrl: './booking-date.component.html',
  styleUrls: ['./booking-date.component.scss'],
})
export class BookingDateComponent implements OnInit {
  selectedDate: NgbDateStruct;
  expanded = false;
  @Input() doctorSchedule: any;
  @Output() changeDate = new EventEmitter<any>();
  public isDisabled: any;
  constructor(private calendar: NgbCalendar) {
  }

  ngOnInit(): void {
    let defaultDate = moment();
    // If Sunday then choose next day => Monday
    if (defaultDate.day() === 0) {
      defaultDate = defaultDate.add(1, 'days');
    }
    this.selectedDate = momentToNgbDate(defaultDate);
  }

  toggleExpandDate() {
    this.expanded = !this.expanded;
  }

  expandDate(expand: boolean) {
    this.expanded = expand;
  }

  onDateSelect(date: NgbDateStruct) {
    this.expanded = false;
    const newMonthFormat = date.month < 10 ? `0${date.month}` : date.month;
    const newDayFormat = date.day < 10 ? `0${date.day}` : date.day;
    const newDate = `${newDayFormat}/${newMonthFormat}/${date.year}`;
    this.selectedDate = date;
    this.changeDate.emit(newDate);
  }

  onClickOutSide(e) {
    this.expanded = false;
  }

  getDateString() {
    const date = this.selectedDate;
    return date ? `${date.day}-${date.month}-${date.year}` : '';
  }

  getMinDate(): NgbDateStruct {
    return momentToNgbDate(moment());
  }

  getMarkDisableDate() {
    const days = this.doctorSchedule
      ? DateService.getDatesByRank(this.doctorSchedule.dateFrom, this.doctorSchedule.dateTo, this.doctorSchedule.slot)
      : null;
    return (date: NgbDate) => {
      return this.calendar.getWeekday(date) > 6 || (days && days.indexOf(date.day) === -1);
    };
  }
}
