import { Injectable } from '@angular/core';
import { RestApiService } from './rest-api.service';
import { BaseService } from './base.service';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class InsuranceService extends BaseService {

  constructor(private http: RestApiService, translate: TranslateService) {
    super(translate);
  }

  fetch() {
    const postData = {
      search: '',
      publish: 1,
      rowperpage: 999,
      pageselected: 1,
      cate_type: 'insurancecate',
      lang : this.getCurrentLocal()
    };
    return this.http.post('category/list', postData);
  }

  fetchServiceCate() {
    const postData = {
      search: '',
      publish: 1,
      rowperpage: 999,
      pageselected: 1,
      cate_type: 'insuranceservicecate',
      lang : this.getCurrentLocal()
    };
    return this.http.post('category/list', postData);
  }

  fetchService(id) {
    const postData = {
      search: '',
      publish: 1,
      rowperpage: 999,
      pageselected: 1,
      cate_id: [id],
      post_type: 'insuranceservice',
      lang : this.getCurrentLocal()
    };
    return this.http.post('post/list', postData);
  }

  fetchFeature() {
    const postData = {
      search: '',
      publish: 1,
      rowperpage: 2,
      pageselected: 1,
      cate_type: 'insurancecate',
      lang : this.getCurrentLocal()
    };
    return this.http.post('category/list', postData);
  }

}
