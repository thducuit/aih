import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router, NavigationStart} from '@angular/router';
import {Subscription, forkJoin} from 'rxjs';
import {environment} from '../../../environments/environment';
import {TranslateService} from '@ngx-translate/core';
import {RouteFactoryService} from '../../services/route-factory.service';
import {UrlService} from '../../services/url.service';
import {Insurance} from '../../models/insurance';
import {InsuranceService} from '../../services/insurance.service';
import {LoaderService} from '../../services/loader-service';

@Component({
    selector: 'app-nav',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit, OnDestroy {

    private subscription: Subscription;
    public loginUrl;
    public routes;
    public categories: Array<any> = [];

    constructor(private translate: TranslateService,
                private routeFactory: RouteFactoryService,
                private urlService: UrlService,
                private insuranceService: InsuranceService,
                private loaderService: LoaderService
    ) {
    }

    ngOnInit() {
        this.routes = this.routeFactory.getRoute();
        if (this.translate.currentLang === 'vi') {
            this.loginUrl = environment.loginViUrl;
        } else {
            this.loginUrl = environment.loginEnUrl;
        }

        this.loadCategory();

        this.subscription = this.translate
            .onLangChange
            .subscribe(() => {
                this.routes = this.routeFactory.getRoute();
                if (this.translate.currentLang === 'vi') {
                    this.loginUrl = environment.loginViUrl;
                } else {
                    this.loginUrl = environment.loginEnUrl;
                }
                this.loadCategory();
            });
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    loadCategory() {
        this.loaderService.show();
        this.insuranceService.fetchServiceCate().subscribe((data: any) => {
            const categories = data['Categories'] || [];
            this.categories = categories
                .map(item => {
                    const insurance = new Insurance(item);
                    insurance.picturePath = UrlService.createPictureUrl(
                        insurance.picture,
                        null,
                        'category',
                    );
                    insurance.url = this.urlService.createConsultingUrl(insurance);
                    return insurance;
                });
            this.loaderService.hide();
        });
    }


}
