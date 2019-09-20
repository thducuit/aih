import {Injectable} from '@angular/core';
import moment from 'moment';

const myTimeBlocks = [
    '08:00', '08:20', '08:40', '09:00', '09:20', '09:40',
    '10:00', '10:20', '10:40', '11:00', '11:20', '11:40',
    '13:00', '13:20', '13:40', '14:00', '14:20', '14:40',
    '15:00', '15:20', '15:40', '16:00', '16:20', '16:40',
    // '17:00', '17:20', '17:40', '18:00', '18:20', '18:40',
    // '19:00', '19:20', '19:40', '20:00', '20:20', '20:40'
];

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

    static getBlockDate(timeBlocks, timeBlocked) {
        const blocks = [];
        // const currTimeBlock = timeBlocks.length ? timeBlocks : myTimeBlocks;
        timeBlocks.forEach(item => {
            if (!this.isBlocked(item, timeBlocked)) {
                blocks.push(item);
            }
        });
        return blocks;
    }

    static checkAbsenceTime(timeBlocks, timeBlocked) {
        const blocks = [];
        timeBlocks.forEach(item => {
            if (!this.isAbsence(item, timeBlocked)) {
                blocks.push(item);
            }
        });
        return blocks;
    }

    static removeOldTime(timeBlocks, serverTime) {
        if (!serverTime) {
            return timeBlocks;
        }
        const times = serverTime.split(' ');
        const date = times[0].trim();
        const time = times[1].trim();
        const nowTime = moment().format();
        const nowTimes = nowTime.split('T');
        const nowDate = nowTimes[0].trim();
        if (nowDate === date) {
            const blocks = [];
            timeBlocks.forEach(item => {
                if (item >= time) {
                    blocks.push(item);
                }
            });
            return blocks;
        }
        return timeBlocks;
    }

    private static isAbsence(time: any, timeBlocked: any) {
        let check = false;
        for (let i = 0; i < timeBlocked.length; i++) {
            const timeRanger = timeBlocked[i].split('-');
            if (timeRanger.length > 1 && timeRanger[0].trim() <= time && timeRanger[1].trim() >= time) {
                check = true;
                break;
            }
        }
        return check;
    }

    private static isBlocked(time: any, timeBlocked: any) {
        let check = false;
        for (let i = 0; i < timeBlocked.length; i++) {
            const timeRanger = timeBlocked[i].split('-');
            if (timeRanger.length > 1 && timeRanger[0].trim() <= time && timeRanger[1].trim() > time) {
                check = true;
                break;
            }
        }
        return check;
    }
}
