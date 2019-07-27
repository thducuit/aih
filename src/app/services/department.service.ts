import { BaseService } from './base.service';
import { TranslateService } from '@ngx-translate/core';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable()
export class DepartmentService extends BaseService {
  constructor(
    translate: TranslateService
  ) {
    super(translate);
  }

  fetch() {
    const mocks = [
      { key: 1, value: 'Khoa Phụ Sản' },
      { key: 2, value: 'Khoa Nhi' },
      { key: 3, value: 'Khoa Ngoại tổng quát' },
      { key: 4, value: 'Khoa Thận Niệu - Nam khoa' },
      { key: 5, value: 'Khoa Tiêu hóa - Gan mật' },
      { key: 6, value: 'Khoa Ung bướu' },
      { key: 7, value: 'Khoa Mắt' },
      { key: 10, value: 'Khoa Chấn thương chỉnh hình' },
      { key: 11, value: 'Khoa Tim mạch' },
      { key: 12, value: 'Khoa Vật lý trị liệu - Phục hồi chức năng' },
      { key: 13, value: 'Khoa Nội tổng quát' },
      { key: 14, value: 'Khoa Thẩm mỹ nội khoa - Chống lão hóa' },
      { key: 16, value: 'Khoa Tai Mũi Họng' },
      { key: 23, value: 'Khoa Chẩn đoán hình ảnh' },
      { key: 24, value: 'Khoa Xét nghiệm' },
      { key: 25, value: 'Khoa Khám bệnh và Kiểm tra sức khỏe tổng quát' },
      { key: 26, value: 'Khoa Hồi sức Cấp cứu' },
      { key: 27, value: 'Khoa Gây mê hồi sức' },
      { key: 28, value: 'Khoa Dinh dưỡng' },
    ];
    return of(mocks);
  }
}
