import { Injectable } from '@angular/core';
import { RestApiService } from './rest-api.service';

@Injectable({
  providedIn: 'root'
})
export class FaqsService {

  constructor(private http: RestApiService) { }

  fetch(pageNum: number) {
    const postData = {
      search: '',
      publish: 1,
      rowperpage: 999,
      pageselected: pageNum,
      post_type: ['faqs'],
      lang : 'vi-VN'
    };
    return this.http.post('media/list', postData);
  }
}
