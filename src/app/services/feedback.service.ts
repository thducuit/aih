import { Injectable } from '@angular/core';
import { RestApiService } from './rest-api.service';
import { BaseService } from './base.service';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class FeedbackService extends BaseService {

  constructor(private http: RestApiService, translate: TranslateService) {
    super(translate);
  }

  fetch() {
    const postData = {
      search: '',
      publish: 1,
      hot: 1,
      // rowperpage: 1,
      // pageselected: 1,
      media_type: ['customer_feedback'],
      lang: this.getCurrentLocal()
    };
    return this.http.post('media/list', postData);
  }

}
