import { Injectable } from '@angular/core';
import { RestApiService } from './rest-api.service';

@Injectable()
export class DoctorService {

  constructor(private http: RestApiService) { }

  fetch() {
    const postData = {
      'search': '',
      'publish': 1,
      'rowperpage': 3,
      'pageselected': 1,
      'post_type': ['news'],
      'lang': 'vi-VN'
    };
    return this.http.post('post/list', postData);
  }

}
