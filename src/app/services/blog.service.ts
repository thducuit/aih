import { Injectable } from '@angular/core';
import { RestApiService } from './rest-api.service';

@Injectable()
export class BlogService {

  constructor(private http: RestApiService) { }

  fetch(pageNum: number) {
    const postData = {
      search: '',
      publish: 1,
      rowperpage: 3,
      pageselected: pageNum || 1,
      post_type: ['news'],
      lang: 'vi-VN'
    };
    return this.http.post('post/list', postData);
  }

}
