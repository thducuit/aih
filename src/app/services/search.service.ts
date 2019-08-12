import {Injectable} from '@angular/core';
import {RestApiService} from './rest-api.service';
import {BaseService} from './base.service';
import {TranslateService} from '@ngx-translate/core';

@Injectable()
export class SearchService extends BaseService {

  constructor(private http: RestApiService, translate: TranslateService) {
    super(translate);
  }

  findPost(keyword, type) {
    const postData = {
      search: keyword,
      publish: 1,
      rowperpage: 999,
      pageselected: 1,
      post_type: [type],
      lang: this.getCurrentLocal()
    };
    return this.http.post('post/list', postData);
  }

  findCategory(keyword, type) {
    const postData = {
      search: keyword,
      publish: 1,
      rowperpage: 999,
      pageselected: 1,
      cate_type: type,
      lang: this.getCurrentLocal()
    };
    return this.http.post('category/list', postData);
  }

}
