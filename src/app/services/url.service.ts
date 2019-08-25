import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable()
export class UrlService {

  constructor() {
  }

  static createPictureUrl(pictureName, size = null, type = 'post', isMeta = false) {
    if(isMeta) {
      return `${environment.backend}${pictureName}`;
    }
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

  static createMemberDetailUrl(alias = null) {
    if (alias) {
      return `/insurance/membership/${alias}`;
    }
    return '/insurance/membership';
  }

  static createInsuranceUrl(alias = null) {
    if (alias) {
      return `/insurance/insurance-detail/${alias}`;
    }
    return '/insurance/insurance-detail';
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

  static createInsuranceDetailUrl(id, alias) {
    const baseUrl = alias === 'insurance' ? '/insurance/insurance-consulting/' : '/insurance/membership-consulting/';
    return `${baseUrl}${id}`;
  }

  static createMediaUrl(thumb) {
    return `${environment.backend}${thumb}`;
  }

  static fixPictureUrl(text) {
    return `${text}`.replace(/\/assets/g, `${environment.backend}/assets`);
  }

  static createIframeUrl(code) {
    return `https://www.youtube.com/embed/${code}?rel=0&modestbranding=1&autoplay=1&showinfo=0&controls=1`;
  }
}
