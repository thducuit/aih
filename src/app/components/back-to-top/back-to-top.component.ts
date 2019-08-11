import { Component, OnInit, HostListener } from '@angular/core';
import { NgAnimateScrollService } from 'ng-animate-scroll';

@Component({
  selector: 'app-back-to-top',
  templateUrl: './back-to-top.component.html',
  styleUrls: ['./back-to-top.component.scss']
})
export class BackToTopComponent implements OnInit {

	public isShowButtonToTop;

  constructor(private animateScrollService: NgAnimateScrollService) { }

  ngOnInit() {
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll($event) {
        if (window.pageYOffset > 100) {
            this.isShowButtonToTop = true;
        }else {
            this.isShowButtonToTop = false;
        }
  }

  backtoTop() {
		this.animateScrollService.scrollToElement('header-top', 150)
  }

}
