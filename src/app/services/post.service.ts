import {Injectable} from '@angular/core';
import {RestApiService} from './rest-api.service';
import {BaseService} from './base.service';
import {TranslateService} from '@ngx-translate/core';

@Injectable()
export class PostService extends BaseService {

  constructor(private http: RestApiService, translate: TranslateService) {
    super(translate);
  }

  fetch(alias) {
    const postData = {
      alias,
      lang: this.getCurrentLocal()
    };
    return this.http.post('post/detail', postData);
  }

  fetchNextPrevNews(postId) {
    const postData = {
      post_id: postId,
      category: 0,
      hot: 0,
      post_type: 'news',
      lang: this.getCurrentLocal()
    };
    return this.http.post('post/adjacent', postData);
  }

  fetchNextPrevDoctor(postId) {
    const postData = {
      post_id: postId,
      category: 0,
      post_type: 'doctor',
      lang: this.getCurrentLocal()
    };
    return this.http.post('post/adjacent', postData);
  }

}
