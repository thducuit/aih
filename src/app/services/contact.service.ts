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
            lang: this.getCurrentLocal()
        };
        return this.http.post('form/contact', postData);
    }

    rating(form) {
        const { content, doctor, price, service, facilities } = form;
        const postData = {
            content,
            doctor,
            price,
            service,
            facilities,
            lang: this.getCurrentLocal()
        };
        return this.http.post('form/rating', postData);
    }

    subsribe(email) {
        const postData = {
            email,
            lang: this.getCurrentLocal()
        };
        return this.http.post('form/newsletter', postData);
    }


}
