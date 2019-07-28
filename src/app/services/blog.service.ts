import { Injectable } from '@angular/core';
import { RestApiService } from './rest-api.service';
import { BaseService } from './base.service';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class BlogService extends BaseService {

  constructor(private http: RestApiService, translate: TranslateService) {
    super(translate);
  }

  fetch(pageNum: number, perPage = 3) {
    const postData = {
      search: '',
      publish: 1,
      rowperpage: perPage,
      pageselected: pageNum || 1,
      post_type: ['news'],
      lang: this.getCurrentLocal()
    };
    return this.http.post('post/list', postData);
  }

  fetchFeature(num = 2) {
    const postData = {
      search: '',
      publish: 1,
      rowperpage: num,
      pageselected: 1,
      post_type: ['news'],
      lang: this.getCurrentLocal(),
      sort: ['post_datepublish DESC']
    };
    return this.http.post('post/list', postData);
  }

}
