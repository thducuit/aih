import {Injectable} from '@angular/core';
import moment from 'moment';

@Injectable()
export class DateService {

  constructor() {
  }

  static getDatesByRank(isoFrom, isoTo, availableDay) {
    const dateFrom = new Date(isoFrom);
    const dateTo = new Date(isoTo);

    const DAY_OF_WEEK = {
      SU: 0,
      MO: 1,
      TU: 2,
      WE: 3,
      TH: 4,
      FR: 5,
      SA: 6
    };

    const availableDays = availableDay.map(item => {
      return DAY_OF_WEEK[item];
    });

    const retVal = [];
    const current = new Date(dateFrom);

    while (current <= dateTo) {
      const day = current.getDay();
      if (availableDays.indexOf(day) !== -1) {
        const date = current.getDate();
        retVal.push(date);
      }
      current.setDate(current.getDate() + 1);
    }
    return retVal;
  }
}
