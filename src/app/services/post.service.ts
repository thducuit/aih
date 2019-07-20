import { Injectable } from '@angular/core';
import { RestApiService } from './rest-api.service';
import { BaseService } from './base.service';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class PostService extends BaseService {

  constructor(private http: RestApiService, translate: TranslateService) {
    super(translate);
  }

  fetch(alias) {
    const postData = {
      alias,
      lang: this.getCurrentLocal()
    };
    return this.http.post('post/detail', postData);
  }

}
