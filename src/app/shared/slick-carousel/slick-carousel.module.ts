import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlickCarouselComponent } from './slick.component';
import { SlickItemDirective } from './slick-item.directive';
export * from './slick.component';

@NgModule({
  imports: [CommonModule],
  declarations: [SlickCarouselComponent, SlickItemDirective],
  exports: [SlickCarouselComponent, SlickItemDirective],
})
export class SlickCarouselModule {}
