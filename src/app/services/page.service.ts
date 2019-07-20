import { Injectable } from '@angular/core';
import { RestApiService } from './rest-api.service';
import { BaseService } from './base.service';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class PageService extends BaseService {

  constructor(private http: RestApiService, translate: TranslateService) {
    super(translate);
  }

  fetch(type) {
    const postData = {
      post_type: type,
      lang : this.getCurrentLocal()
    };
    return this.http.post('post/detail-top', postData);
  }
}
