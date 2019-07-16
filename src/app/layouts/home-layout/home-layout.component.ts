import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-home-layout',
  templateUrl: './home-layout.component.html',
  styleUrls: ['./home-layout.component.scss'],
})
export class HomeLayoutComponent implements OnInit {
  constructor(private translate: TranslateService) {}

  ngOnInit() {}

  get pageClasses() {
    const language = this.translate.currentLang;
    return [language, 'window'];
  }
}
