import {Injectable} from '@angular/core';
import {RestApiService} from './rest-api.service';
import {BaseService} from './base.service';
import {TranslateService} from '@ngx-translate/core';
import {Share} from '../decorators/share';
import {environment} from '../../environments/environment';

@Injectable()
export class OtherpackageService extends BaseService {

    private currentLang;

    constructor(private http: RestApiService, translate: TranslateService) {
        super(translate);
    }

    getAlias(alias) {
        const postData = {
            alias,
            lang: this.currentLang,
            target_lang: this.getCurrentLocal()
        };
        return this.http.post('post/alias-by-lang', postData);
    }

    @Share()
    fetchService() {
        const postData = {
            search: '',
            publish: 1,
            rowperpage: 999,
            pageselected: 1,
            post_type: ['otherpackage'],
            lang: this.getCurrentLocal()
        };
        return this.http.post('post/list', postData);
    }

}
