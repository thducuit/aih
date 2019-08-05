import { Component, AfterViewInit, Inject, PLATFORM_ID, NgZone, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { GlobalEventService } from './services/global-event.service';
import {
  Router,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError,
} from '@angular/router';
import { Title } from '@angular/platform-browser';
import { forkJoin, Subscription } from 'rxjs';
import { getLanguage, setLanguage } from './utilities';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit, OnDestroy {
  loading = false;
  loadingCount = 0;
  private isBrowser = true;
  private subscription: Subscription;

  constructor(
    private translate: TranslateService,
    globalEventService: GlobalEventService,
    private title: Title,
    private zone: NgZone,
    @Inject(PLATFORM_ID) platformId: string
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang('en');

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    if (this.isBrowser) {
      this.translate.use(getLanguage());
    } else {
      this.translate.use('vi'); // Activappe current language or default language
    }

    // Set app title
    this.subscription = translate
    .onLangChange
    .subscribe(() => {
      this.updateBodyClasses();
    });

    // Listen for global events
    globalEventService
      .on('show-loading', () => {
        this.loading = true;
      })
      .on('hide-loading', () => {
        this.loading = false;
        this.loadingCount = 0;
      })
      .on('loading-up', () => {
        this.loadingCount++;
        if (this.loadingCount > 0) {
          this.loading = true;
        }
      })
      .on('loading-down', () => {
        this.loadingCount = Math.max(0, this.loadingCount - 1);
        if (this.loadingCount <= 0) {
          this.loading = false;
        }
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngAfterViewInit(): void {
    this.updateBodyClasses();
  }

  switchLanguage(language: string) {
    this.translate.use(language);
    if (this.isBrowser) {
      setLanguage(language);
    }
  }

  private updateBodyClasses() {
    this.zone.runOutsideAngular(() => {
      const body = document.body;
      const language = this.translate.currentLang;
      body.classList.toggle('window', true);
      if (language === 'vi') {
        body.classList.toggle('vi', true);
        body.classList.toggle('en', false);
      } else {
        body.classList.toggle('vi', false);
        body.classList.toggle('en', true);
      }
    });
  }
}
