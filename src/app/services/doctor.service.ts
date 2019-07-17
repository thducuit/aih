import { Injectable } from '@angular/core';
import { RestApiService } from './rest-api.service';

@Injectable()
export class DoctorService {

  constructor(private http: RestApiService) { }

  fetch() {
    const postData = {
      search: '',
      publish: 1,
      hot: 1,
      rowperpage: 999,
      pageselected: 1,
      post_type: ['doctor'],
      lang : 'vi-VN'
    };
    return this.http.post('post/list', postData);
  }

}
