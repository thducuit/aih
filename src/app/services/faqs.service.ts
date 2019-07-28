import { Injectable } from '@angular/core';
import { RestApiService } from './rest-api.service';
import { BaseService } from './base.service';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class FaqsService extends BaseService {

  constructor(private http: RestApiService, translate: TranslateService) {
    super(translate);
  }

  fetch(pageNum: number) {
    const postData = {
      search: '',
      publish: 1,
      rowperpage: 999,
      pageselected: pageNum,
      post_type: ['faqs'],
      lang : this.getCurrentLocal()
    };
    return this.http.post('media/list', postData);
  }
}
