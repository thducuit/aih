import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

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
    return this.translate.currentLang;
  }

  switchLanguage(language: string) {
    this.translate.use(language);
    this.expanded = false;
  }

  toggleLanguage() {
    this.expanded = !this.expanded;
  }
}
