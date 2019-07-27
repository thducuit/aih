import { Component, OnInit, OnDestroy } from '@angular/core';
import { TestimonialService } from 'src/app/services/testimonial.service';
import { Testimonial } from 'src/app/models/testimonial';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-testimonial',
  templateUrl: './testimonial.component.html',
  styleUrls: ['./testimonial.component.scss'],
})
export class TestimonialComponent implements OnInit, OnDestroy {
  public currentPage = 1;
  public testimonials: any[];
  private subcription: Subscription;

  constructor(
    private testimonialService: TestimonialService,
    private translate: TranslateService
  ) { }

  ngOnInit() {
    this.loadTestimonials();
    this.subcription = this.translate
      .onLangChange
      .subscribe(() => {
        this.loadTestimonials();
      });
  }

  ngOnDestroy() {
    this.subcription.unsubscribe();
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
