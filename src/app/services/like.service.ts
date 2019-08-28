import {Injectable} from '@angular/core';
import {RestApiService} from './rest-api.service';
import {BaseService} from './base.service';
import {TranslateService} from '@ngx-translate/core';

@Injectable()
export class LikeService extends BaseService {

    constructor(private http: RestApiService, translate: TranslateService) {
        super(translate);
    }

    add(user, postId) {
        const postData = {
            like_fullname: user.name,
            like_avatar: user.photoUrl,
            like_social_type: user.provider,
            like_social_id: user.id,
            like_objid: postId,
            like_type: 'news',
            lang: this.getCurrentLocal()
        };
        return this.http.post('like/add', postData);
    }

    delete(user, postId) {
        const postData = {
            like_social_type: user.provider,
            like_social_id: user.id,
            like_objid: postId,
            like_type: 'news',
            lang: this.getCurrentLocal()
        };
        return this.http.post('like/delete', postData);
    }

}
