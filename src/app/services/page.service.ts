import { Injectable } from '@angular/core';
import { RestApiService } from './rest-api.service';
import { BaseService } from './base.service';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PageService extends BaseService {

  constructor(private http: RestApiService, translate: TranslateService) {
    super(translate);
  }

  fetch(type): Observable<any> {
    const postData = {
      post_type: type,
      lang : this.getCurrentLocal()
    };
    return this.http.post('post/detail-top', postData);
  }
}
