import { Injectable } from '@angular/core';
import { RestApiService } from './rest-api.service';

@Injectable()
export class CategoryService {

  constructor(private http: RestApiService) { }

  fetch() {
    const postData = {
      'search': '',
      'publish': 1,
      'rowperpage': 999,
      'pageselected': 1,
      'cate_type': 'careercate',
      'lang' : 'vi-VN'
    };
    return this.http.post('category/list', postData);
  }

}
