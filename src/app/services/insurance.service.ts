import { Injectable } from '@angular/core';
import { RestApiService } from './rest-api.service';

@Injectable()
export class InsuranceService {

  constructor(private http: RestApiService) { }

  fetch() {
    const postData = {
      'search': '',
      'publish': 1,
      'rowperpage': 999,
      'pageselected': 1,
      'cate_type': 'insurancecate',
      'lang' : 'vi-VN'
    };
    return this.http.post('category/list', postData);
  }

  fetchFeature() {
    const postData = {
      'search': '',
      'publish': 1,
      'rowperpage': 2,
      'pageselected': 1,
      'cate_type': 'insurancecate',
      'lang' : 'vi-VN'
    };
    return this.http.post('category/list', postData);
  }

}
