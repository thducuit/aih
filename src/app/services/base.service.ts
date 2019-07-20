import { TranslateService } from '@ngx-translate/core';

export class BaseService {
  constructor(public translate: TranslateService) { }

  public getCurrentLocal() {
    const dict = {
      en: 'en-US',
      vi: 'vi-VN'
    };
    const lang = this.translate.currentLang;
    return dict[lang] ? dict[lang] : lang;
  }
}
