import { Component, OnInit } from '@angular/core';
import { TestimonialService } from 'src/app/services/testimonial.service';
import { Testimonial } from 'src/app/models/testimonial';

@Component({
  selector: 'app-testimonial',
  templateUrl: './testimonial.component.html',
  styleUrls: ['./testimonial.component.scss'],
})
export class TestimonialComponent implements OnInit {
  public currentPage = 1;
  public testimonials: any[];

  constructor(private testimonialService: TestimonialService) {}

  ngOnInit() {
    this.loadTestimonials();
  }

  loadTestimonials() {
    this.testimonialService
      .fetch(this.currentPage)
      .subscribe((response: any) => {
        this.testimonials = (response.Media || [])
          .filter(x => {
            return x.media_type === 'customer_feedback';
          })
          .map((x: any) => {
            return new Testimonial(x);
          });
        console.log(this.testimonials);
      });
  }
}
