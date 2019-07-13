import { Component, AfterViewInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { getLanguage } from './utilities';
import { GlobalEventService } from './services/global-event.service';
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  title = 'aih-app';
  loading = false;

  constructor(
    private translate: TranslateService,
    private globalEventService: GlobalEventService,
    private router: Router
  ) {
    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang('en');

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    this.translate.use(getLanguage()); // Activappe current language or default language

    // Listen for global events
    globalEventService
      .on('show-loading', () => {
        this.loading = true;
      })
      .on('hide-loading', () => {
        this.loading = false;
      });
  }

  ngAfterViewInit(): void {
    // this.router
    //   .events
    //   .subscribe((event) => {
    //     console.log('XXX', event);
    //     if (event instanceof NavigationStart) {
    //       this.loading = true;
    //     } else if (
    //       event instanceof NavigationEnd ||
    //       event instanceof NavigationCancel ||
    //       event instanceof NavigationError
    //     ) {
    //       this.loading = false;
    //     }
    //   });
  }

  switchLanguage(language: string) {
    this.translate.use(language);
  }
}
