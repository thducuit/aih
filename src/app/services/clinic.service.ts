import { Injectable } from '@angular/core';
import { RestApiService } from './rest-api.service';
import { BaseService } from './base.service';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class ClinicService extends BaseService {

  constructor(private http: RestApiService, translate: TranslateService) {
    super(translate);
  }

  fetch() {
    const postData = {
      search: '',
      publish: 1,
      rowperpage: 999,
      pageselected: 1,
      cate_type: 'clinic',
      lang : this.getCurrentLocal()
    };
    return this.http.post('category/list', postData);
  }

  fetchFeature() {
    const postData = {
      search: '',
      publish: 1,
      rowperpage: 2,
      pageselected: 1,
      cate_type: 'clinic',
      lang : this.getCurrentLocal()
    };
    return this.http.post('category/list', postData);
  }

  fetchHot() {
    const postData = {
      search: '',
      publish: 1,
      hot: 1,
      rowperpage: 999,
      pageselected: 1,
      cate_type: 'clinic',
      lang : this.getCurrentLocal()
    };
    return this.http.post('category/list', postData);
  }

}
