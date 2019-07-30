import {Injectable} from '@angular/core';
import {RestApiService} from './rest-api.service';
import {BaseService} from './base.service';
import {TranslateService} from '@ngx-translate/core';

@Injectable()
export class ContactService extends BaseService {

    constructor(private http: RestApiService, translate: TranslateService) {
        super(translate);
    }

    apply(form) {
        const postData = {
            fullname: form.fullname,
            email: form.email,
            content: form.content,
            lang: 'vi-VN'
        };
        return this.http.post('form/contact', postData);
    }

}
