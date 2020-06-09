import {Component, OnDestroy, OnInit} from '@angular/core';
import {environment} from '../../../environments/environment';
import {Subscription} from 'rxjs';
import {TranslateService} from '@ngx-translate/core';
import {UrlService} from '../../services/url.service';

@Component({
    selector: 'app-top-header',
    templateUrl: './top-header.component.html',
    styleUrls: ['./top-header.component.scss']
})
export class TopHeaderComponent implements OnInit, OnDestroy {

    private subscription: Subscription;
    public loginUrl;

    constructor(private translate: TranslateService,
                public urlService: UrlService) {
    }

    ngOnInit() {
        if (this.translate.currentLang === 'vi') {
            this.loginUrl = environment.loginViUrl;
        } else {
            this.loginUrl = environment.loginEnUrl;
        }

        this.subscription = this.translate
            .onLangChange
            .subscribe(() => {
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
