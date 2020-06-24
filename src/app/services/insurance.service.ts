import {Injectable} from '@angular/core';
import {RestApiService} from './rest-api.service';
import {BaseService} from './base.service';
import {TranslateService} from '@ngx-translate/core';
import {Share} from '../decorators/share';

@Injectable()
export class InsuranceService extends BaseService {

    private currentLang;

    constructor(private http: RestApiService, translate: TranslateService) {
        super(translate);
    }

    @Share()
    fetch() {
        const postData = {
            search: '',
            publish: 1,
            rowperpage: 999,
            pageselected: 1,
            cate_type: 'insurancecate',
            lang: this.getCurrentLocal()
        };
        return this.http.post('category/list', postData);
    }

    @Share()
    fetchServiceCate() {
        this.currentLang = this.getCurrentLocal();
        const postData = {
            search: '',
            publish: 1,
            rowperpage: 999,
            pageselected: 1,
            cate_type: 'insuranceservicecate',
            lang: this.getCurrentLocal()
        };
        return this.http.post('category/list', postData);
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
    fetchService(id) {
        const postData = {
            search: '',
            publish: 1,
            rowperpage: 999,
            pageselected: 1,
            cate_id: [id],
            post_type: 'insuranceservice',
            lang: this.getCurrentLocal()
        };
        return this.http.post('post/list', postData);
    }

    @Share()
    fetchFeature() {
        const postData = {
            search: '',
            publish: 1,
            rowperpage: 2,
            pageselected: 1,
            cate_type: 'insurancecate',
            lang: this.getCurrentLocal()
        };
        return this.http.post('category/list', postData);
    }

}
