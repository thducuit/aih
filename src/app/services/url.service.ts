import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {RouteFactoryService} from './route-factory.service';

@Injectable()
export class UrlService {

    constructor(private routeFactory: RouteFactoryService) {
    }

    static createPictureUrl(pictureName, size = null, type = 'post', isMeta = false) {
        if (isMeta) {
            return `${environment.backend}${pictureName}`;
        }
        if (size) {
            return `${environment.backend}/assets/uploads/images/${type}/thumbs/${size}/${pictureName}`;
        }
        return `${environment.backend}/assets/uploads/images/${type}/${pictureName}`;
    }

    static createMediaUrl(thumb) {
        return `${environment.backend}${thumb}`;
    }

    static fixPictureUrl(text) {
        if (text && text.indexOf('http') === 0) {
            return text;
        }
        return `${text}`.replace(/\/assets/g, `${environment.backend}/assets`);
    }

    static createIframeUrl(code) {
        return `https://www.youtube.com/embed/${code}?rel=0&modestbranding=1&autoplay=1&showinfo=0&controls=1`;
    }

    createNewsDetailUrl(alias = null) {
        const routes = this.routeFactory.getRoute();
        if (alias) {
            return routes.news + `/${alias}`;
        }
        return routes.news;
    }

    createDoctorDetailUrl(alias = null) {
        const routes = this.routeFactory.getRoute();
        if (alias) {
            return routes.doctor + `/${alias}`;
        }
        return routes.doctor;
    }

    createCareerDetailUrl(alias = null) {
        const routes = this.routeFactory.getRoute();
        if (alias) {
            return routes.career + `/${alias}`;
        }
        return routes.career;
    }

    createMemberDetailUrl(alias = null) {
        const routes = this.routeFactory.getRoute();
        if (alias) {
            return routes.dmem + `/${alias}`;
        }
        return routes.insmem;
    }

    createClinicDetailUrl(alias = null) {
        const routes = this.routeFactory.getRoute();
        if (alias) {
            return routes.mservice + `/${alias}`;
        }
        return routes.mservice;
    }

    createInsuranceDetailUrl(alias = null) {
        const routes = this.routeFactory.getRoute();
        if (alias) {
            return routes.dins + `/${alias}`;
        }
        return routes.insmem;
    }

    getUrlByKey(key) {
        const routes = this.routeFactory.getRoute();
        return routes[key];
    }

    createConsultingUrl(ins) {
        const id = ins.id;
        const alias = ins.alias;
        const routes = this.routeFactory.getRoute();
        const baseUrl = (alias.indexOf('insurance') > -1 || alias.indexOf('bao-hiem') > -1) ? routes.cins : routes.cmem;
        return `${baseUrl}/${alias}`;
    }

    createInsuranceConsulting(alias = null) {
        const routes = this.routeFactory.getRoute();
        if (alias) {
            return routes.cins + `/${alias}`;
        }
        return routes.insmem;
    }

    createMemberConsulting(alias = null) {
        const routes = this.routeFactory.getRoute();
        if (alias) {
            return routes.cmem + `/${alias}`;
        }
        return routes.insmem;
    }
}
