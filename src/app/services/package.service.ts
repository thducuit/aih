import { Injectable } from '@angular/core';
import { RestApiService } from './rest-api.service';
import { BaseService } from './base.service';
import { TranslateService } from '@ngx-translate/core';
import { Share } from '../decorators/share';

@Injectable()
export class PackageService extends BaseService {
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
      cate_type: 'package',
      lang: this.getCurrentLocal(),
    };
    return this.http
      .post('category/list', postData);
  }

  @Share()
  fetchService() {
    const postData = {
      search: '',
      publish: 1,
      rowperpage: 999,
      pageselected: 1,
      cate_type: 'packageservice',
      lang: this.getCurrentLocal(),
    };
    return this.http.post('category/list', postData);
  }

  @Share()
  fetchFeature() {
    const postData = {
      search: '',
      publish: 1,
      rowperpage: 2,
      pageselected: 1,
      cate_type: 'package',
      lang: this.getCurrentLocal(),
    };
    return this.http.post('category/list', postData);
  }
}
