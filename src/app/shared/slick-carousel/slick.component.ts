import {
  Component,
  forwardRef,
  OnDestroy,
  OnChanges,
  AfterViewInit,
  AfterViewChecked,
  Input,
  Output,
  ElementRef,
  NgZone,
  SimpleChanges,
  EventEmitter,
} from '@angular/core';

import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { SlickItemDirective } from './slick-item.directive';

@Component({
  selector: 'ngx-slick-carousel',
  exportAs: 'slick-carousel',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SlickCarouselComponent),
      multi: true,
    },
  ],
  template: '<ng-content></ng-content>',
})
export class SlickCarouselComponent
  implements OnDestroy, OnChanges, AfterViewInit, AfterViewChecked {
  @Input() config: any;
  @Output() afterChange: EventEmitter<any> = new EventEmitter();
  @Output() beforeChange: EventEmitter<any> = new EventEmitter();
  @Output() breakpoint: EventEmitter<any> = new EventEmitter();
  @Output() destroy: EventEmitter<any> = new EventEmitter();
  @Output() init: EventEmitter<any> = new EventEmitter();

  public $instance: any;
  public currentIndex: number;
  public slides: any[] = [];
  public initialized = false;
  private removedSlides: SlickItemDirective[] = [];
  private addedSlides: SlickItemDirective[] = [];

  /**
   * Constructor
   */
  constructor(private el: ElementRef, private zone: NgZone) {}

  /**
   * On component destroy
   */
  ngOnDestroy() {
    this.unslick();
  }

  ngAfterViewInit(): void {
    this.ngAfterViewChecked();
  }

  /**
   * On component view checked
   */
  ngAfterViewChecked() {
    if (this.addedSlides.length > 0 || this.removedSlides.length > 0) {
      const nextSlidesLength =
        this.slides.length -
        this.removedSlides.length +
        this.addedSlides.length;
      if (!this.initialized) {
        if (nextSlidesLength > 0) {
          this.initSlick();
        }
        // if nextSlidesLength is zere, do nothing
      } else if (nextSlidesLength === 0) {
        // unslick case
        this.unslick();
      } else {
        this.addedSlides.forEach(slickItem => {
          this.slides.push(slickItem);
          this.zone.runOutsideAngular(() => {
            this.$instance.slick('slickAdd', slickItem.el.nativeElement);
          });
        });
        this.addedSlides = [];

        this.removedSlides.forEach(slickItem => {
          const idx = this.slides.indexOf(slickItem);
          this.slides = this.slides.filter(s => s !== slickItem);
          this.zone.runOutsideAngular(() => {
            this.$instance.slick('slickRemove', idx);
          });
        });
        this.removedSlides = [];
      }
    }
  }

  /**
   * init slick
   */
  initSlick() {
    this.slides = this.addedSlides;
    this.addedSlides = [];
    this.removedSlides = [];
    this.zone.runOutsideAngular(() => {
      this.$instance = jQuery(this.el.nativeElement);

      this.$instance.on('init', (event, slick) => {
        this.zone.run(() => {
          this.init.emit({ event, slick });
        });
      });

      this.$instance.slick(this.config);

      this.zone.run(() => {
        this.initialized = true;

        this.currentIndex =
          this.config && this.config.initialSlide
            ? this.config.initialSlide
            : 0;
      });

      this.$instance.on('afterChange', (event, slick, currentSlide) => {
        this.zone.run(() => {
          this.afterChange.emit({ event, slick, currentSlide });
          this.currentIndex = currentSlide;
        });
      });

      this.$instance.on(
        'beforeChange',
        (event, slick, currentSlide, nextSlide) => {
          this.zone.run(() => {
            this.beforeChange.emit({ event, slick, currentSlide, nextSlide });
            this.currentIndex = nextSlide;
          });
        },
      );

      this.$instance.on('breakpoint', (event, slick, breakpoint) => {
        this.zone.run(() => {
          this.breakpoint.emit({ event, slick, breakpoint });
        });
      });

      this.$instance.on('destroy', (event, slick) => {
        this.zone.run(() => {
          this.destroy.emit({ event, slick });
          this.initialized = false;
        });
      });
    });
  }

  addSlide(slickItem: SlickItemDirective) {
    this.addedSlides.push(slickItem);
  }

  removeSlide(slickItem: SlickItemDirective) {
    this.removedSlides.push(slickItem);
  }

  /**
   * Slick Method
   */
  public slickGoTo(index: number) {
    this.zone.runOutsideAngular(() => {
      this.$instance.slick('slickGoTo', index);
    });
  }

  public slickNext() {
    this.zone.runOutsideAngular(() => {
      this.$instance.slick('slickNext');
    });
  }

  public slickPrev() {
    this.zone.runOutsideAngular(() => {
      this.$instance.slick('slickPrev');
    });
  }

  public slickPause() {
    this.zone.runOutsideAngular(() => {
      this.$instance.slick('slickPause');
    });
  }

  public slickPlay() {
    this.zone.runOutsideAngular(() => {
      this.$instance.slick('slickPlay');
    });
  }

  public unslick() {
    if (this.$instance) {
      this.zone.runOutsideAngular(() => {
        this.$instance.slick('unslick');
      });
      this.$instance = undefined;
    }
    this.initialized = false;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.initialized) {
      const config = changes['config'];
      if (
        config.previousValue !== config.currentValue &&
        config.currentValue !== undefined
      ) {
        const refresh = config.currentValue['refresh'];
        const newOptions = Object.assign({}, config.currentValue);
        delete newOptions['refresh'];

        this.zone.runOutsideAngular(() => {
          this.$instance.slick('slickSetOption', newOptions, refresh);
        });
      }
    }
  }
}
