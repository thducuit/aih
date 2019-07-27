import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable()
export class UrlService {

  constructor() { }
  static createPictureUrl(pictureName, size = null, type= 'post') {
    if (size) {
      return `${environment.backend}/assets/uploads/images/${type}/thumbs/${size}/${pictureName}`;
    }
    return `${environment.backend}/assets/uploads/images/${type}/${pictureName}`;
  }
  static createNewsDetailUrl(alias = null) {
     if (alias) {
       return `/news/detail/${alias}`;
     }
     return '/news';
  }
  static createCareerDetailUrl(alias = null) {
    if (alias) {
      return `/career/detail/${alias}`;
    }
    return '/career';
  }
  static createDoctorDetailUrl(alias = null) {
    if (alias) {
      return `/doctor/detail/${alias}`;
    }
    return '/doctor';
  }
  static createClinicDetailUrl(alias = null) {
    if (alias) {
      return `/patient-services/medical-services/${alias}`;
    }
    return '/patient-services/medical-services';
  }
  static createMediaUrl(thumb) {
    return `${environment.backend}${thumb}`;
  }
  static fixPictureUrl(text) {
    return `${text}`.replace(/\/assets/g, `${environment.backend}/assets`);
  }
}
