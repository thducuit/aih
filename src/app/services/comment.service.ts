import {Injectable} from '@angular/core';
import {RestApiService} from './rest-api.service';
import {BaseService} from './base.service';
import {TranslateService} from '@ngx-translate/core';

@Injectable()
export class CommentService extends BaseService {

  constructor(private http: RestApiService, translate: TranslateService) {
    super(translate);
  }

  comment(user, id, type, content) {
    const postData = {
      comment_fullname: user.name,
      comment_email: user.email,
      comment_avatar: user.photoUrl,
      comment_social_type: user.provider,
      comment_social_id: user.id,
      comment_message: content,
      comment_type: type,
      comment_objid: id,
      comment_parentid: 0,
      lang: this.getCurrentLocal()
    };
    return this.http.post('comment/add', postData);
  }

  comments(id, type) {
    const postData = {
      comment_type: type,
      obj_id: id,
      lang: this.getCurrentLocal()
    };
    return this.http.post('comment/list', postData);
  }


}
