import { TranslateLoader } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import fs from 'fs-extra';

export class TranslateUniversalLoader implements TranslateLoader {
  constructor(
    private prifix: string = 'i18n',
    private suffix: string = '.json',
  ) {}

  public getTranslation(lang: string): Observable<any> {
    return Observable.create(observer => {
      observer.next(
        JSON.parse(
          fs.readFileSync(`${this.prifix}/${lang}${this.suffix}`, 'utf8'),
        ),
      );
      observer.complete();
    });
  }
}
