import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.css']
})
export class LanguageComponent implements OnInit {
  isCollapse: boolean;
  currentLanguage: string;
  constructor(private translate: TranslateService) {
    this.isCollapse = false;
    this.currentLanguage = 'vi';
  }

  ngOnInit() {
  }

  switchLanguage(language: string) {
    this.translate.use(language);
    this.currentLanguage = language;
    this.isCollapse = false;
  }

  collapseLang() {
    this.isCollapse = !this.isCollapse;
  }

}
