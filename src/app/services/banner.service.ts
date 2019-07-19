import { Injectable } from '@angular/core';
import { RestApiService } from './rest-api.service';

@Injectable({
  providedIn: 'root'
})
export class BannerService {

  constructor(private http: RestApiService) { }

  fetch(type, pageId) {
    const postData = {
      position: 'bannertop',
      obj_id: pageId,
      obj_type: type,
      lang : 'vi-VN'
    };
    return this.http.post('banner/list', postData);
  }
}
