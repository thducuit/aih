import {Injectable} from '@angular/core';
import {RestApiService} from './rest-api.service';
import {BaseService} from './base.service';
import {TranslateService} from '@ngx-translate/core';

@Injectable()
export class PostService extends BaseService {

    private currentLang;

    constructor(private http: RestApiService, translate: TranslateService) {
        super(translate);
    }

    fetch(alias, haveCount = false) {
        this.currentLang = this.getCurrentLocal();
        const postData = {
            alias,
            lang: this.getCurrentLocal(),
        };
        if(haveCount) {
          postData['commentsCount'] = true;
          postData['likesCount'] = true;
        }
        return this.http.post('post/detail', postData);
    }

    getAlias(alias) {
        const postData = {
            alias,
            lang: this.currentLang,
            target_lang: this.getCurrentLocal()
        };
        return this.http.post('post/alias-by-lang', postData);
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
            hot: 0,
            post_type: 'doctor',
            lang: this.getCurrentLocal()
        };
        return this.http.post('post/adjacent', postData);
    }

}
