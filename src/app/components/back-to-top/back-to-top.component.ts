import { Component, OnInit, HostListener, OnDestroy } from '@angular/core';
import { NgAnimateScrollService } from 'ng-animate-scroll';
import { Subject } from 'rxjs';
import { debounceTime, throttleTime } from 'rxjs/operators';

@Component({
  selector: 'app-back-to-top',
  templateUrl: './back-to-top.component.html',
  styleUrls: ['./back-to-top.component.scss'],
})
export class BackToTopComponent implements OnDestroy {
  public isShowButtonToTop;
  private scrollSubject = new Subject();
  private scrollSubscription = this.scrollSubject
    .pipe(throttleTime(150))
    .subscribe(() => {
      this.update();
    });

  constructor(private animateScrollService: NgAnimateScrollService) {}

  ngOnDestroy() {
    this.scrollSubscription.unsubscribe();
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll($event) {
    this.scrollSubject.next();
  }

  update() {
    if (window.pageYOffset > 100) {
      this.isShowButtonToTop = true;
    } else {
      this.isShowButtonToTop = false;
    }
  }

  backtoTop() {
    this.animateScrollService.scrollToElement('header-top', 150);
  }
}
