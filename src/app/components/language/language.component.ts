import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { getLanguage, setLanguage } from 'src/app/utilities';

@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.css']
})
export class LanguageComponent {
  public expanded = false;

  constructor(private translate: TranslateService) {
  }

  get language() {
    return getLanguage();
  }

  switchLanguage(language: string) {
    this.translate.use(language);
    setLanguage(language);
  }

  toggleLanguage() {
    this.expanded = !this.expanded;
  }

}
