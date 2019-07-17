import { Component, OnInit } from '@angular/core';
import { FaqsService } from 'src/app/services/faqs.service';
import { Faq } from 'src/app/models/faq';

@Component({
  selector: 'app-qa',
  templateUrl: './qa.component.html',
  styleUrls: ['./qa.component.scss'],
})
export class QaComponent implements OnInit {
  public currentPage = 1;
  public faqs: any[];

  constructor(private faqsService: FaqsService) {}

  ngOnInit() {
    this.loadFaqs();
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
