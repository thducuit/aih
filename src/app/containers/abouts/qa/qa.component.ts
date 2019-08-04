import {
  Component,
  OnInit,
  OnDestroy,
  ViewChildren,
  QueryList,
} from '@angular/core';
import { FaqsService } from 'src/app/services/faqs.service';
import { Faq } from 'src/app/models/faq';
import { TranslateService } from '@ngx-translate/core';
import { Subscription, forkJoin } from 'rxjs';
import { FaqItemComponent } from 'src/app/components/faq-item/faq-item.component';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-qa',
  templateUrl: './qa.component.html',
  styleUrls: ['./qa.component.scss'],
})
export class QaComponent implements OnInit, OnDestroy {
  public currentPage = 1;
  public faqs: any[];
  private subscription: Subscription;

  @ViewChildren(FaqItemComponent)
  private faqItems: QueryList<FaqItemComponent>;

  constructor(
    private faqsService: FaqsService,
    private translate: TranslateService,
    private titleService: Title
  ) { }

  ngOnInit() {
    this.loadFaqs();
    this.applyTitle();
    this.subscription = this.translate.onLangChange.subscribe(() => {
      this.loadFaqs();
      this.applyTitle();
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

  closeAllFaq() {
    if (this.faqItems) {
      this.faqItems.forEach(item => {
        item.expanded = false;
      });
    }
  }

  onTryToggleItem(item: FaqItemComponent) {
    if (!item) {
      return;
    }
    if (!item.expanded) {
      this.closeAllFaq();
    }
    item.expanded = !item.expanded;
  }

  applyTitle() {
    forkJoin(
      this.translate.get('faqs'),
      this.translate.get('american_international_hospital')
    ).subscribe(([faqsStr, aihStr]) => {
      this.titleService.setTitle(`${faqsStr} - ${aihStr}`);
    });
  }
}
