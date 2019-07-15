import { Injectable } from '@angular/core';
import { RestApiService } from './rest-api.service';

@Injectable()
export class ClinicService {

  constructor(private http: RestApiService) { }

  fetch() {
    const postData = {
      'search': '',
      'publish': 1,
      'rowperpage': 999,
      'pageselected': 1,
      'cate_type': 'clinic',
      'lang' : 'vi-VN'
    };
    return this.http.post('category/list', postData);
  }

}
