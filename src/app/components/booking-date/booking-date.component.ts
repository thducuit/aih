import {Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter} from '@angular/core';
import { NgbDateStruct, NgbCalendar, NgbDate} from '@ng-bootstrap/ng-bootstrap';
import {DateService} from "../../services/date.service";

@Component({
  selector: 'app-booking-date',
  templateUrl: './booking-date.component.html',
  styleUrls: ['./booking-date.component.scss'],
})
export class BookingDateComponent implements OnInit, OnChanges {
  selectedDate: NgbDateStruct;
  expanded = false;
  @Input() doctorSchedule: any;
  @Output() changeDate = new EventEmitter<any>();
  public isDisabled: any;
  constructor() {
  }

  ngOnInit(): void {}

  toggleExpandDate() {
    this.expanded = !this.expanded;
  }

  onDateSelect(date: NgbDateStruct) {
    this.expanded = false;
    const newMonthFormat = date.month < 10 ? `0${date.month}` : date.month;
    const newDayFormat = date.day < 10 ? `0${date.day}` : date.day;
    const newDate = `${newDayFormat}/${newMonthFormat}/${date.year}`;
    this.changeDate.emit(newDate);
  }

  getDateString() {
    const date = this.selectedDate;
    return date ? `${date.day}-${date.month}-${date.year}` : '';
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.doctorSchedule) {
      console.log('this.doctorSchedule', this.doctorSchedule);
      const days = DateService.getDatesByRank(this.doctorSchedule.dateFrom, this.doctorSchedule.dateTo, this.doctorSchedule.slot);
      this.isDisabled = (date: NgbDate, current: {month: number}) => days.indexOf(date.day) === -1;
    }
  }


}
