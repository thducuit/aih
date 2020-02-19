import { Injectable } from '@angular/core';
import { RestApiService } from './rest-api.service';
import { BaseService } from './base.service';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { Share } from '../decorators/share';

@Injectable({
  providedIn: 'root'
})
export class PageService extends BaseService {

  constructor(private http: RestApiService, translate: TranslateService) {
    super(translate);
  }

  @Share()
  fetch(type): Observable<any> {
    const postData = {
      post_type: type,
      lang : this.getCurrentLocal()
    };
    return this.http.post('post/detail-top', postData);
  }

  @Share()
  fetchBanner(type): Observable<any> {
      const postData = {
          search: '',
          publish: 1,
          rowperpage: 999,
          pageselected: 1,
          post_type: [type],
          lang : this.getCurrentLocal(),
          sort : ['post_sort DESC']
      };
      return this.http.post('post/list', postData);
  }
}
