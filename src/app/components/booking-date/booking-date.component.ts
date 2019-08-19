import {Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter} from '@angular/core';
import {NgbDateStruct, NgbCalendar, NgbDate} from '@ng-bootstrap/ng-bootstrap';
import {DateService} from '../../services/date.service';
import moment from 'moment';
import {momentToNgbDate, stringPadStart} from 'src/app/utilities';

@Component({
    selector: 'app-booking-date',
    templateUrl: './booking-date.component.html',
    styleUrls: ['./booking-date.component.scss'],
})
export class BookingDateComponent implements OnInit {
    selectedDate: NgbDateStruct;
    expanded = false;
    @Input() doctorSchedule: any;
    @Input() animateAfter: boolean;
    @Output() changeDate = new EventEmitter<NgbDateStruct>();
    public isDisabled: any;

    constructor(private calendar: NgbCalendar) {
    }

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
        return date ? `${stringPadStart(String(date.day), 2, '0')}-${stringPadStart(String(date.month), 2, '0')}-${date.year}` : '';
    }

    getMinDate(): NgbDateStruct {
        return momentToNgbDate(moment());
    }

    getMarkDisableDate() {
        return (date: NgbDate) => {
            return this.calendar.getWeekday(date) > 6;
        };
    }

    reset() {
        let defaultDate = moment();
        // If Sunday then choose next day => Monday
        if (defaultDate.day() === 0) {
            defaultDate = defaultDate.add(1, 'days');
        }

        this.onDateSelect(momentToNgbDate(defaultDate));
    }
}
