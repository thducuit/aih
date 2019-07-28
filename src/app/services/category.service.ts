import { Injectable } from '@angular/core';
import { RestApiService } from './rest-api.service';
import { TranslateService } from '@ngx-translate/core';
import { BaseService } from './base.service';

@Injectable()
export class CategoryService extends BaseService {

  constructor(private http: RestApiService, translate: TranslateService) {
    super(translate);
  }

  fetch(alias, type) {
    const postData = {
      alias,
      cate_type: type,
      lang: this.getCurrentLocal()
    };
    return this.http.post('category/detail', postData);
  }

}
