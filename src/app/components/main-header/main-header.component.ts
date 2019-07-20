import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate, AnimationEvent } from '@angular/animations';
import { Router, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.scss'],
  animations: [
    trigger('toggleNav', [
      state('initial', style({
        left: '-100%'
      })),
      state('final', style({
        left: 0
      })),
      transition('initial=>final', animate('500ms')),
      transition('final=>initial', animate('500ms'))
    ])
  ]
})
export class MainHeaderComponent implements OnInit {
  currentState = 'initial';
  isMobileNavOpened = false;

  constructor(private router: Router) { }

  ngOnInit() {
    this.router
    .events
    .subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.currentState = 'initial';
        console.log('Nav close');
      }
    });
  }

  toggleState() {
    this.currentState = this.currentState === 'initial' ? 'final' : 'initial';
  }

  onAnimation(event: AnimationEvent) {
    if (event.phaseName === 'done') {
      document.body.style.overflow = event.toState === 'final' ? 'hidden' : 'auto';
    } else {
      this.isMobileNavOpened = event.toState === 'final';
    }
  }
}
