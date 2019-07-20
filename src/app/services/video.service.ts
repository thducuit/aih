import { Injectable } from '@angular/core';
import { RestApiService } from './rest-api.service';

@Injectable()
export class VideoService {

  constructor(private http: RestApiService) { }

  fetch() {
    const postData = {
      search: '',
      publish: 1,
      rowperpage: 999,
      pageselected: 1,
      media_type: ['video'],
      lang: 'vi-VN'
    };
    return this.http.post('media/list', postData);
  }

}
