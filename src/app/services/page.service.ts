import { Injectable } from '@angular/core';
import { RestApiService } from './rest-api.service';
import { BaseService } from './base.service';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PageService extends BaseService {

  constructor(private http: RestApiService, translate: TranslateService) {
    super(translate);
  }

  fetch(type): Observable<any> {
    const postData = {
      post_type: type,
      lang : this.getCurrentLocal()
    };
    return this.http.post('post/detail-top', postData);
  }

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
