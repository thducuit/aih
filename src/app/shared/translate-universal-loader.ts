import { TranslateLoader } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import fs from 'fs-extra';

export class TranslateUniversalLoader implements TranslateLoader {
  constructor(
    private prefix: string = 'i18n',
    private suffix: string = '.json',
  ) {}

  public getTranslation(lang: string): Observable<any> {
    return Observable.create(observer => {
      const jsonContent = fs.readFileSync(
        `${this.prefix}/${lang}${this.suffix}`,
        'utf8',
      );
      observer.next(JSON.parse(jsonContent));
      observer.complete();
    });
  }
}
