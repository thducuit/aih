import { Injectable } from '@angular/core';
import { RestApiService } from './rest-api.service';
import { BaseService } from './base.service';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
    providedIn: 'root'
})
export class InsuranceMediaService extends BaseService {

    constructor(private http: RestApiService, translate: TranslateService) {
        super(translate);
    }

    fetch() {
        const postData = {
            search: '',
            publish: 1,
            rowperpage: 999,
            post_type: ['insurance'],
            lang : this.getCurrentLocal()
        };
        return this.http.post('media/list', postData);
    }
}
