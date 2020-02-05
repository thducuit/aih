import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Subscription, forkJoin } from 'rxjs';
import {environment} from '../../../environments/environment';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit, OnDestroy {

	private subscription: Subscription;
	public loginUrl;

  	constructor(private translate: TranslateService) { }

  	ngOnInit() {
    this.subscription = this.translate
      .onLangChange
      .subscribe(() => {
      	const lang = this.translate.currentLang;
      	if(lang == 'vi') {
      		this.loginUrl = environment.loginViUrl;
      	}else {
			this.loginUrl = environment.loginEnUrl;
      	}
      });
  }

  ngOnDestroy() {
    if(this.subscription) {
      this.subscription.unsubscribe();
    }
  }


}
