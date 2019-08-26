import moment from 'moment';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

function getNativeLocalStorage() {
  return localStorage;
}

export function getLanguage() {
  const storage = getNativeLocalStorage();
  const storedLang = storage.getItem('lang');
  return storedLang || 'vi'; // Default languge is VI
}

export function setLanguage(lang: string) {
  const storage = getNativeLocalStorage();
  storage.setItem('lang', lang);
}

export function CalculatePagination(current: number, total: number) {
  const last = total;
  const delta = 2;
  const left = current - delta;
  const right = current + delta + 1;
  const range = [];
  const rangeWithDots = [];
  let l: number;

  for (let i = 1; i <= last; i++) {
    if (i === 1 || i === last || (i >= left && i < right)) {
      range.push(i);
    }
  }

  for (let i = 0; i < range.length; i++) {
    const num = range[i];
    if (l) {
      if (num - l === 2) {
        rangeWithDots.push(l + 1);
      } else if (num - l !== 1) {
        rangeWithDots.push('...');
      }
    }
    rangeWithDots.push(num);
    l = num;
  }

  return rangeWithDots;
}

export function momentToNgbDate(date: moment.Moment): NgbDateStruct {
  return {
    year: date.year(),
    month: date.month() + 1,
    day: date.date(),
  };
}

export function maxMomentToNgbDate(date: moment.Moment): NgbDateStruct {
    return {
        year: date.year(),
        month: date.month() + 3,
        day: date.date(),
    };
}

export function compareTwoHours(h1: string, h2: string) {
  if (h1 === h2) {
    return 0;
  }
  const time1 = h1.split(':');
  const time2 = h2.split(':');
  if (Number(time1[0]) > Number(time2[0])) {
    return 1;
  }
  if (Number(time1[0]) < Number(time2[0])) {
    return -1;
  }
  if (Number(time1[1]) > Number(time2[1])) {
    return 1;
  }
  if (Number(time1[1]) < Number(time2[1])) {
    return -1;
  }
  return 0;
}

export function stringPadStart(
  str: string,
  targetLength: number,
  padString: string,
): string {
  targetLength = targetLength >> 0; // truncate if number, or convert non-number to 0;
  padString = String(typeof padString !== 'undefined' ? padString : ' ');
  if (str.length >= targetLength) {
    return String(str);
  } else {
    targetLength = targetLength - str.length;
    if (targetLength > padString.length) {
      padString += padString.repeat(targetLength / padString.length); // append to original to ensure we are longer than needed
    }
    return padString.slice(0, targetLength) + String(str);
  }
}

export function ngbDateStructToString(date: NgbDateStruct) {
  return `${date.year}-${stringPadStart(
    String(date.month),
    2,
    '0',
  )}-${stringPadStart(String(date.day), 2, '0')}`;
}

export function escapeHtml(str: string) {
  const doc = new DOMParser().parseFromString(str, 'text/html');
  return doc.body.textContent;
}

export function extractHtmlText(str: string) {
  return `${str}`.replace(/(<([^>]+)>)/ig, '');
}
