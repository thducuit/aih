import { Component, OnInit, OnDestroy } from '@angular/core';
import { TestimonialService } from 'src/app/services/testimonial.service';
import { Testimonial } from 'src/app/models/testimonial';
import { TranslateService } from '@ngx-translate/core';
import { Subscription, forkJoin } from 'rxjs';
import { Title, Meta } from '@angular/platform-browser';

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
    private translate: TranslateService,
    private titleService: Title,
    private meta: Meta
  ) { }

  ngOnInit() {
    this.loadTestimonials();
    this.applyTitle();
    this.subcription = this.translate
      .onLangChange
      .subscribe(() => {
        this.applyTitle();
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
          .map((x: any) => {
            return new Testimonial(x);
          });
      });
  }

  applyTitle() {
    forkJoin(
      this.translate.get('testimonials'),
      this.translate.get('american_international_hospital')
    )
    .subscribe(([mainTitle, subTitle]) => {
      const pageTitle = `${mainTitle} - ${subTitle}`;
      this.titleService.setTitle(pageTitle);
      this.meta.updateTag({
        property: 'og:title',
        content: pageTitle
      });
    });
  }
}
