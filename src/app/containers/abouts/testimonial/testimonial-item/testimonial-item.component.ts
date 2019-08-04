import { Component, OnInit, Input } from '@angular/core';
import { Testimonial } from 'src/app/models/testimonial';

@Component({
  selector: 'app-testimonial-item',
  templateUrl: './testimonial-item.component.html',
  styleUrls: ['./testimonial-item.component.scss']
})
export class TestimonialItemComponent implements OnInit {
  @Input()
  public testimonial: Testimonial;

  expaned = false;

  constructor() { }

  get needShowMore(): boolean {
    return this.testimonial && this.testimonial.longdesc && this.testimonial.longdesc.length > 400;
  }

  ngOnInit() {
  }

  getShortDesc(): string {
    if (!this.testimonial) {
      return '';
    }
    return `${this.testimonial.longdesc}`.substr(0, 400);
  }

  getShowMoreContent() {
    if (!this.needShowMore) {
      return '';
    }
    return `${this.testimonial.longdesc}`.substr(401);
  }

  expandShowMore(expand: boolean) {
    this.expaned = expand;
  }
}
