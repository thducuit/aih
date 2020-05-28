import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router, NavigationStart} from '@angular/router';
import {Subscription, forkJoin} from 'rxjs';
import {environment} from '../../../environments/environment';
import {TranslateService} from '@ngx-translate/core';
import {RouteFactoryService} from '../../services/route-factory.service';

@Component({
    selector: 'app-nav',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit, OnDestroy {

    private subscription: Subscription;
    public loginUrl;
    public routes;

    constructor(private translate: TranslateService,
                private routeFactory: RouteFactoryService) {
    }

    ngOnInit() {
        this.routes = this.routeFactory.getRoute();
        if (this.translate.currentLang === 'vi') {
            this.loginUrl = environment.loginViUrl;
        } else {
            this.loginUrl = environment.loginEnUrl;
        }

        this.subscription = this.translate
            .onLangChange
            .subscribe(() => {
                this.routes = this.routeFactory.getRoute();
                if (this.translate.currentLang === 'vi') {
                    this.loginUrl = environment.loginViUrl;
                } else {
                    this.loginUrl = environment.loginEnUrl;
                }
            });
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }


}
