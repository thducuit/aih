import { Component, OnInit, Input } from '@angular/core';
import { Testimonial } from 'src/app/models/testimonial';
import {ScrollToService} from '@nicky-lenaers/ngx-scroll-to';

@Component({
  selector: 'app-testimonial-item',
  templateUrl: './testimonial-item.component.html',
  styleUrls: ['./testimonial-item.component.scss']
})
export class TestimonialItemComponent implements OnInit {
  @Input()
  public testimonial: Testimonial;

  expaned = false;

  constructor(private scrollToService: ScrollToService) { }

  get needShowMore(): boolean {
    return this.testimonial && this.testimonial.longdesc && this.testimonial.longdesc.split(' ').length > 100;
  }

  ngOnInit() {
  }

  getShortDesc(): string {
    if (!this.testimonial) {
      return '';
    }
    return `${this.testimonial.longdesc}`.split(' ').slice(0, 100).join(' ');
  }

  getShowMoreContent() {
    if (!this.needShowMore) {
      return '';
    }
    return `${this.testimonial.longdesc}`;
  }

  expandShowMore(expand: boolean) {
    this.expaned = expand;
  }
}
