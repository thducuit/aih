import { Injectable } from '@angular/core';
import { RestApiService } from './rest-api.service';

@Injectable()
export class CategoryService {

  constructor(private http: RestApiService) { }

  fetch(alias, type) {
    const postData = {
      alias: alias,
      cate_type: type,
      lang: 'vi-VN'
    };
    return this.http.post('category/detail', postData);
  }

}
