import { Component, AfterViewInit } from '@angular/core';
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
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  loading = false;
  loadingCount = 0;

  constructor(
    private translate: TranslateService,
    private globalEventService: GlobalEventService,
    private router: Router,
    private title: Title,
  ) {
    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang('en');

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    this.translate.use('vi'); // Activappe current language or default language

    // Set app title
    this.updateTitle();
    translate.onLangChange.subscribe(() => {
      this.updateTitle();
    });

    // Listen for global events
    globalEventService
      .on('show-loading', () => {
        this.loading = true;
      })
      .on('hide-loading', () => {
        this.loading = false;
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

  updateTitle() {
    forkJoin(
      this.translate.get('home'),
      this.translate.get('american_international_hospital'),
    ).subscribe(([home, aihHospital]) => {
      this.title.setTitle(`${home} - ${aihHospital}`);
    });
  }
}
