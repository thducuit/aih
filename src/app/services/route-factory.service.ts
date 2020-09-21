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
            insmem: '/dich-vu-bao-hiem',
            cins: '/dich-vu-khach-hang-va-bao-hiem',
            cmem: '/dich-vu-khach-hang-va-bao-hiem',
            dmem: '/dich-vu-khach-hang-va-bao-hiem',
            dins: '/dich-vu-khach-hang-va-bao-hiem',
            doctor: '/bac-sy',
            news: '/tin-tuc',
            videos: '/videos',
            career: '/tuyen-dung',
            contact: '/lien-he',
            search: '/tim-kiem',

            ins_service_menu: '/dich-vu-khach-hang-va-bao-hiem/bao-hiem',
            cus_service_menu: '/dich-vu-khach-hang-va-bao-hiem/dich-vu-khach-hang',
            mem_service_menu: '/dich-vu-khach-hang-va-bao-hiem/the-thanh-vien',
        },
        'en-US': {
            about: '/about-us/aih-hospital',
            faq: '/about-us/faq',
            testimonial: '/about-us/testimonial',
            mservice: '/patient-services/medical-services',
            mpackage: '/patient-services/medical-package',
            factsheet: '/patient-services/factsheet',
            insmem: '/insurance-services',
            cins: '/insurance-and-customer-services',
            cmem: '/insurance-and-customer-services',
            dmem: '/insurance-and-customer-services',
            dins: '/insurance-and-customer-services',
            doctor: '/doctor',
            news: '/news',
            videos: '/video',
            career: '/career',
            contact: '/contact',
            search: '/search',

            ins_service_menu: '/insurance-and-customer-services/insurance-services',
            cus_service_menu: '/insurance-and-customer-services/customer-services',
            mem_service_menu: '/insurance-and-customer-services/membership',
        },
    };

    getRoute() {
        return this.defaultRoute[this.getCurrentLocal()];
    }
}
