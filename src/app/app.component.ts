import {Component} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import { getLanguage } from './utilities';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'aih-app';

  constructor(private translate: TranslateService) {
    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang('en');

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    this.translate.use(getLanguage()); // Activappe current language or default language
  }

  switchLanguage(language: string) {
    this.translate.use(language);
  }
}
