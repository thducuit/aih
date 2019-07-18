import { Component, OnInit, Input } from '@angular/core';
import { Faq } from 'src/app/models/faq';

@Component({
  selector: 'app-faq-item',
  templateUrl: './faq-item.component.html',
  styleUrls: ['./faq-item.component.scss']
})
export class FaqItemComponent {
  @Input()
  public faq: Faq;

  public expanded = false;

  constructor() { }

  toggle() {
    this.expanded = ! this.expanded;
  }
}
