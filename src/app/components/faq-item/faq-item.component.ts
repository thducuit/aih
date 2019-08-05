import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Faq } from 'src/app/models/faq';

@Component({
  selector: 'app-faq-item',
  templateUrl: './faq-item.component.html',
  styleUrls: ['./faq-item.component.scss']
})
export class FaqItemComponent {
  @Input()
  public faq: Faq;

  @Output()
  public selectToggle = new EventEmitter<any>();

  public expanded = false;

  constructor() { }

  toggle() {
    this.selectToggle.emit(this);
  }
}
