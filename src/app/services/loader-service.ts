import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface LoaderState {
  show: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private loaderSubject = new Subject<LoaderState>();
  public loaderState = this.loaderSubject.asObservable();

  constructor() {}

  show() {
    this.loaderSubject.next({ show: true });
  }

  hide() {
    this.loaderSubject.next({ show: false });
  }
}
