import {
  OnInit,
  AfterViewInit,
  OnDestroy,
  Input,
  Output,
  EventEmitter,
  ElementRef,
  NgZone,
  Inject,
  PLATFORM_ID,
  Directive,
} from '@angular/core';
import { isPlatformServer, isPlatformBrowser } from '@angular/common';
import { Subscription, fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { isBrowserSupportIntersectionObserver } from '../utilities';

@Directive({
  selector: '[deferLoad]',
})
export class DeferLoadDirective implements OnInit, AfterViewInit, OnDestroy {
  @Input() public preRender = true;
  @Input() public fallbackEnabled = true;
  @Output() public deferLoad: EventEmitter<any> = new EventEmitter();

  private intersectionObserver?: IntersectionObserver;
  private scrollSubscription?: Subscription;

  constructor(
    private element: ElementRef,
    private zone: NgZone,
    @Inject(PLATFORM_ID) private platformId,
  ) {}

  public ngOnInit() {
    if (
      (isPlatformServer(this.platformId) && this.preRender === true) ||
      (isPlatformBrowser(this.platformId) &&
        this.fallbackEnabled === false &&
        !isBrowserSupportIntersectionObserver())
    ) {
      this.load();
    }
  }

  public ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      if (isBrowserSupportIntersectionObserver()) {
        this.registerIntersectionObserver();
        if (this.intersectionObserver && this.element.nativeElement) {
          this.intersectionObserver.observe(this.element.nativeElement);
        }
      } else if (this.fallbackEnabled === true) {
        this.addScrollListeners();
      }
    }
  }

  public ngOnDestroy() {
    this.removeListeners();
  }

  private registerIntersectionObserver(): void {
    if (!!this.intersectionObserver) {
      return;
    }
    this.intersectionObserver = new IntersectionObserver(entries => {
      this.checkForIntersection(entries);
    }, {});
  }

  private checkForIntersection = (
    entries: Array<IntersectionObserverEntry>,
  ) => {
    entries.forEach((entry: IntersectionObserverEntry) => {
      if (this.checkIfIntersecting(entry)) {
        this.load();
        if (this.intersectionObserver && this.element.nativeElement) {
          this.intersectionObserver.unobserve(this.element.nativeElement);
        }
      }
    });
  };

  private checkIfIntersecting(entry: IntersectionObserverEntry) {
    // For Samsung native browser, IO has been partially implemented where by the
    // callback fires, but entry object is empty. We will check manually.
    if (entry && entry.time) {
      return (
        (entry as any).isIntersecting &&
        entry.target === this.element.nativeElement
      );
    }
    return this.isVisible();
  }

  private load(): void {
    this.removeListeners();
    this.deferLoad.emit();
  }

  private addScrollListeners() {
    if (this.isVisible()) {
      this.load();
      return;
    }
    this.zone.runOutsideAngular(() => {
      this.scrollSubscription = fromEvent(window, 'scroll')
        .pipe(debounceTime(50))
        .subscribe(this.onScroll);
    });
  }

  private removeListeners() {
    if (this.scrollSubscription) {
      this.scrollSubscription.unsubscribe();
    }

    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect();
    }
  }

  private onScroll = () => {
    if (this.isVisible()) {
      this.zone.run(() => this.load());
    }
  };

  private isVisible() {
    const scrollPosition = this.getScrollPosition();
    const elementOffset = this.element.nativeElement.offsetTop;
    return elementOffset <= scrollPosition;
  }

  private getScrollPosition() {
    // Getting screen size and scroll position for IE
    return (
      (window.scrollY || window.pageYOffset) +
      (document.documentElement.clientHeight || document.body.clientHeight)
    );
  }
}
