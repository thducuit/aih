import {Injectable} from '@angular/core';
import {RestApiService} from './rest-api.service';
import {BaseService} from './base.service';
import {TranslateService} from '@ngx-translate/core';

@Injectable()
export class CareerService extends BaseService {

    constructor(private http: RestApiService, translate: TranslateService) {
        super(translate);
    }

    fetch() {
        const postData = {
            search: '',
            publish: 1,
            rowperpage: 999,
            post_type: ['career'],
            lang: this.getCurrentLocal()
        };
        return this.http.post('post/list', postData);
    }

    apply(form) {
        const postData = {
            fullname: form.fullname,
            position: form.position,
            phone: form.phone,
            email: form.email,
            content: form.content,
            attach: form.attach,
        };
        return this.http.post('form/career', postData);
    }

}
