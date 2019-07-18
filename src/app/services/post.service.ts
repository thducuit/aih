import { Injectable } from '@angular/core';
import { RestApiService } from './rest-api.service';

@Injectable()
export class PostService {

  constructor(private http: RestApiService) { }

  fetch(alias) {
    const postData = {
      'alias': alias,
    };
    return this.http.post('post/detail', postData);
  }

}
