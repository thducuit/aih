import { Directive, OnInit, OnDestroy, ElementRef, Inject, PLATFORM_ID, Host } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { SlickCarouselComponent } from './slick.component';

@Directive({
  selector: '[ngxSlickItem]',
})
export class SlickItemDirective implements OnInit, OnDestroy {
  constructor(
    public el: ElementRef,
    @Inject(PLATFORM_ID) private platformId: string,
    @Host() private carousel: SlickCarouselComponent,
  ) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.carousel.addSlide(this);
    }
  }

  ngOnDestroy() {
    if (isPlatformBrowser(this.platformId)) {
      this.carousel.removeSlide(this);
    }
  }
}
