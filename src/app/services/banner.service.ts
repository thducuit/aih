import { Injectable } from '@angular/core';
import { RestApiService } from './rest-api.service';
import { BaseService } from './base.service';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class BannerService extends BaseService {

  constructor(private http: RestApiService, translate: TranslateService) {
    super(translate);
  }

  fetch(type: string, pageId: any) {
    const postData = {
      position: 'bannertop',
      obj_id: pageId,
      obj_type: type,
      lang : 'vi-VN' // I've try with en-US but no result reponse
    };
    return this.http.post('banner/list', postData);
  }
}
