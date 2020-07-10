import {Injectable} from '@angular/core';
import {BaseService} from './base.service';

@Injectable()
export class RouteFactoryService extends BaseService {
    // list of route
    private defaultRoute = {
        'vi-VN': {
            about: '/gioi-thieu/benh-vien-aih',
            faq: '/gioi-thieu/hoi-dap',
            testimonial: '/gioi-thieu/y-kien-khach-hang',
            mservice: '/dich-vu-y-khoa/chuyen-khoa',
            mpackage: '/dich-vu-y-khoa/goi-dich-vu',
            factsheet: '/dich-vu-y-khoa/thong-tin-noi-bat',
            insmem: '/dich-vu-bao-hiem/bao-hiem-thanh-vien',
            cins: '/dich-vu-bao-hiem/tu-van-bao-hiem',
            cmem: '/dich-vu-bao-hiem/tu-van-thanh-vien',
            dmem: '/dich-vu-bao-hiem/thanh-vien',
            dins: '/dich-vu-bao-hiem/bao-hiem',
            doctor: '/bac-sy',
            news: '/tin-tuc',
            videos: '/videos',
            career: '/tuyen-dung',
            contact: '/lien-he',
            search: '/tim-kiem'
        },
        'en-US': {
            about: '/about-us/aih-hospital',
            faq: '/about-us/faq',
            testimonial: '/about-us/testimonial',
            mservice: '/patient-services/medical-services',
            mpackage: '/patient-services/medical-package',
            factsheet: '/patient-services/factsheet',
            insmem: '/insurance-services/insurance-membership',
            cins: '/insurance-services/insurance-consulting',
            cmem: '/insurance-services/membership-consulting',
            dmem: '/insurance-services/membership',
            dins: '/insurance-services/insurance',
            doctor: '/doctor',
            news: '/news',
            videos: '/video',
            career: '/career',
            contact: '/contact',
            search: '/search',
        },
    };

    getRoute() {
        return this.defaultRoute[this.getCurrentLocal()];
    }
}
