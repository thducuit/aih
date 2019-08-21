import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { isPlatformBrowser } from '@angular/common';
import { setLanguage } from 'src/app/utilities';

@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.scss']
})
export class LanguageComponent {
  public expanded = false;

  constructor(
    private translate: TranslateService,
    @Inject(PLATFORM_ID) private platformId: string
  ) {
  }

  get language() {
    return this.translate.currentLang;
  }

  switchLanguage(language: string) {
    this.translate.use(language);
    this.expanded = false;
    if (isPlatformBrowser(this.platformId)) {
      setLanguage(language);
    }
  }

  toggleLanguage() {
    this.expanded = !this.expanded;
  }

  clickOutside(e) {
    this.expanded = false;
  }
}
