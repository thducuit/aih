import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalEventService {
  private listeners = {};
  private events = new Subject<any>();
  constructor() {
    this.events.asObservable().subscribe(({ name, args }) => {
      if (this.listeners[name]) {
        for (const listener of this.listeners[name]) {
          listener(...args);
        }
      }
    });
  }

  on(name: string, listener) {
    if (!this.listeners[name]) {
      this.listeners[name] = [];
    }
    this.listeners[name].push(listener);
    return this;
  }

  off(name: string, listener) {
    if (!this.listeners[name]) { return this; }
    this.listeners[name] = this.listeners[name].filter(x => x !== listener);
    return this;
  }

  emit(name, ...args: any[]) {
    this.events.next({
      name,
      args
    });
  }
}
