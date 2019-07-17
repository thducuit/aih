import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable()
export class UrlService {

  constructor() { }
  static createPictureUrl(pictureName, size = null) {
    if(size) {
      return `${environment.backend}/assets/uploads/images/post/thumbs/${size}/${pictureName}`;
    }
    return `${environment.backend}/assets/uploads/images/post/${pictureName}`;
  }

}
