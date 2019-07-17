import { Injectable } from '@angular/core';
import { RestApiService } from './rest-api.service';

@Injectable({
  providedIn: 'root'
})
export class TestimonialService {

  constructor(private http: RestApiService) { }

  fetch(pageNum: number) {
    const postData = {
      search: '',
      publish: 1,
      rowperpage: 999,
      pageselected: pageNum,
      post_type: ['customer_feedback'],
      lang : 'vi-VN'
    };
    return this.http.post('media/list', postData);
  }
}
