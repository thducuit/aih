import { Injectable } from '@angular/core';
import { RestApiService } from './rest-api.service';

@Injectable()
export class FeedbackService {

  constructor(private http: RestApiService) { }

  fetch() {
    const postData = {
      search: '',
      publish: 1,
      hot: 1,
      rowperpage: 1,
      pageselected: 1,
      media_type: ['customer_feedback'],
      lang: 'vi-VN'
    };
    return this.http.post('media/list', postData);
  }

}
