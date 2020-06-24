import {Injectable} from '@angular/core';
import {RestApiService} from './rest-api.service';
import {TranslateService} from '@ngx-translate/core';
import {BaseService} from './base.service';

@Injectable()
export class CategoryService extends BaseService {

    private currentLang;

    constructor(private http: RestApiService, translate: TranslateService) {
        super(translate);
    }

    fetch(alias, type) {
        this.currentLang = this.getCurrentLocal();
        const postData = {
            alias,
            cate_type: type,
            lang: this.getCurrentLocal()
        };
        return this.http.post('category/detail', postData);
    }

    getAlias(alias) {
        const postData = {
            alias,
            lang: this.currentLang,
            target_lang: this.getCurrentLocal()
        };
        return this.http.post('post/alias-by-lang', postData);
    }

}
