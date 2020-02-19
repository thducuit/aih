import { Injectable } from '@angular/core';
import { RestApiService } from './rest-api.service';
import { BaseService } from './base.service';
import { TranslateService } from '@ngx-translate/core';
import { Share } from '../decorators/share';

const KeyDoctors = 'doctors';
const KeyBookingDoctors = 'booking-doctors';

@Injectable()
export class DoctorService extends BaseService {
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
      post_type: ['doctor'],
      sort: ['post_sort DESC'],
      lang: this.getCurrentLocal(),
    };
    return this.http
      .post('post/doctor', postData);
  }

  @Share()
  fetchBookingDoctor() {
    const postData = {
      search: '',
      publish: 1,
      rowperpage: 999,
      pageselected: 1,
      post_type: ['doctor'],
      sort: ['post_sort DESC'],
      lang: this.getCurrentLocal(),
    };
    return this.http
      .post('post/doctor', postData);
  }
}
