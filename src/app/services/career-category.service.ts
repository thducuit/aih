import { Injectable } from '@angular/core';
import { RestApiService } from './rest-api.service';
import { BaseService } from './base.service';
import { TranslateService } from '@ngx-translate/core';
import { Share } from '../decorators/share';

@Injectable()
export class CareerCategoryService extends BaseService {

  constructor(private http: RestApiService, translate: TranslateService) {
    super(translate);
  }

  @Share()
  fetch() {
    const postData = {
      search: '',
      publish: 1,
      rowperpage: 999,
      pageselected: 1,
      cate_type: 'careercate',
      lang : this.getCurrentLocal()
    };
    return this.http.post('category/list', postData);
  }

}
