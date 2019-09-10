import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  trigger,
  state,
  style,
  transition,
  animate,
  AnimationEvent,
} from '@angular/animations';
import { Router, NavigationStart } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.scss'],
  animations: [
    trigger('toggleNav', [
      state(
        'initial',
        style({
          transform: 'translateX(-100%)'
        }),
      ),
      state(
        'final',
        style({
          transform: 'translateX(0)'
        }),
      ),
      transition('initial=>final', animate('500ms')),
      transition('final=>initial', animate('500ms')),
    ]),
  ],
})
export class MainHeaderComponent implements OnInit, OnDestroy {
  isMobileNavOpened = false;
  routerSubscription: Subscription;

  constructor(private router: Router) {}

  ngOnInit() {
    this.routerSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.isMobileNavOpened = false;
      }
    });
  }

  ngOnDestroy() {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

  toggleState() {
    this.isMobileNavOpened = !this.isMobileNavOpened;
  }
}
