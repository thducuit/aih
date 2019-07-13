import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.css']
})
export class LanguageComponent implements OnInit {

  constructor(private translate: TranslateService) {
  }

  switchLanguage(language: string) {
    this.translate.use(language);
  }

  ngOnInit() {
  }

}
