import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { getLanguage, setLanguage } from 'src/app/utilities';

@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.scss']
})
export class LanguageComponent {
  public expanded = false;

  constructor(private translate: TranslateService) {
  }

  get language() {
    return getLanguage();
  }

  switchLanguage(language: string) {
    console.log(language);
    this.translate.use(language);
    setLanguage(language);
    this.expanded = false;
  }

  toggleLanguage() {
    this.expanded = !this.expanded;
  }
}
