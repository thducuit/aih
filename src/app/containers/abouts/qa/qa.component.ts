import { Component, OnInit, OnDestroy } from '@angular/core';
import { FaqsService } from 'src/app/services/faqs.service';
import { Faq } from 'src/app/models/faq';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-qa',
  templateUrl: './qa.component.html',
  styleUrls: ['./qa.component.scss'],
})
export class QaComponent implements OnInit, OnDestroy {
  public currentPage = 1;
  public faqs: any[];
  private subscription: Subscription;

  constructor(
    private faqsService: FaqsService,
    private translate: TranslateService
  ) { }

  ngOnInit() {
    this.loadFaqs();
    this.subscription = this.translate
      .onLangChange
      .subscribe(() => {
        this.loadFaqs();
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getLeftColumnItems() {
    const faqs = this.faqs || [];
    const middle = Math.ceil(faqs.length / 2);
    return faqs.slice(0, middle);
  }

  getRightColumnItems() {
    const faqs = this.faqs || [];
    const middle = Math.ceil(faqs.length / 2);
    return faqs.slice(middle);
  }

  loadFaqs() {
    this.faqsService.fetch(this.currentPage).subscribe((response: any) => {
      console.log(response);
      const media = response.Media || [];
      this.faqs = media
        .filter(x => {
          return x.media_type === 'faqs';
        })
        .map(x => {
          return new Faq(x);
        });
    });
  }
}
