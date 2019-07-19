import { Injectable } from '@angular/core';
import { RestApiService } from './rest-api.service';

@Injectable({
  providedIn: 'root'
})
export class PageService {

  constructor(private http: RestApiService) { }

  fetch(type) {
    const postData = {
      post_type: type,
      lang : 'vi-VN'
    };
    return this.http.post('post/detail-top', postData);
  }
}
