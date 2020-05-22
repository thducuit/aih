import {Injectable} from '@angular/core';
import {RestApiService} from './rest-api.service';
import {BaseService} from './base.service';
import {TranslateService} from '@ngx-translate/core';
import { Share } from '../decorators/share';

@Injectable()
export class BlogService extends BaseService {

    constructor(private http: RestApiService, translate: TranslateService) {
        super(translate);
    }

    @Share()
    fetch(pageNum: number, perPage = 999, sort = [], isNoVideo = false) {
        const postData = {
            search: '',
            publish: 1,
            rowperpage: perPage,
            pageselected: pageNum || 1,
            post_type: ['news'],
            sort,
            commentsCount: true,
            likesCount: true,
            lang: this.getCurrentLocal()
        };
        if (isNoVideo) {
            postData['hot'] = 0;
        }
        return this.http.post('post/list', postData);
    }

    @Share()
    fetchFeature(num = 2) {
        const postData = {
            search: '',
            publish: 1,
            hot: 0,
            rowperpage: num,
            pageselected: 1,
            post_type: ['news'],
            lang: this.getCurrentLocal(),
            sort: ['post_datepublish DESC']
        };
        return this.http.post('post/list', postData);
    }

    getByClinic(pageNum: number, perPage = 999, id) {
      const postData = {
        publish: 1,
        rowperpage: perPage,
        pageselected: pageNum || 1,
        cate_id: [id],
        lang: this.getCurrentLocal()
      };
      return this.http.post('post/clinic-news', postData);
    }
}
