import {
    Component,
    AfterViewInit,
    Inject,
    PLATFORM_ID,
    NgZone,
    OnDestroy,
    Renderer2,
    HostListener
} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {Title, Meta} from '@angular/platform-browser';
import {Subscription} from 'rxjs';
import {getLanguage, setLanguage} from './utilities';
import {isPlatformBrowser, DOCUMENT} from '@angular/common';
import {environment} from 'src/environments/environment';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit, OnDestroy {
    private isBrowser = true;
    private subscription: Subscription;

    constructor(private translate: TranslateService,
                private title: Title,
                private metaService: Meta,
                private zone: NgZone,
                private renderer: Renderer2,
                @Inject(PLATFORM_ID) platformId: string,
                @Inject(DOCUMENT) private document: Document) {
        this.isBrowser = isPlatformBrowser(platformId);
        // this language will be used as a fallback when a translation isn't found in the current language
        translate.setDefaultLang('vi');

        // the lang to use, if the lang isn't available, it will use the current loader to get them
        if (this.isBrowser) {
            this.translate.use(getLanguage());
        } else {
            this.translate.use('vi'); // Activate current language or default language
        }

        // Set app title
        this.subscription = translate.onLangChange.subscribe((obj) => {
            // this.document.documentElement.lang = obj ? obj.lang : 'en';
            this.renderer.setAttribute(document.querySelector('html'), 'lang', obj.lang);
            this.updateBodyClasses();
        });

        // Meta service
        this.setSeoMeta();
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

    // @HostListener('contextmenu', ['$event'])
    // onRightClick(event) {
    //   event.preventDefault();
    // }

    @HostListener('copy', ['$event'])
    onCopy(event) {
      event.preventDefault();
    }

    @HostListener('cut', ['$event'])
    onCut(event) {
      event.preventDefault();
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

    private setSeoMeta() {
        const meta = this.metaService;
        this.translate
            .get('american_international_hospital_meta_desc')
            .subscribe(desc => {
                meta.updateTag({
                    name: 'description',
                    content: desc,
                });
                meta.updateTag({
                    property: 'og:description',
                    content: desc,
                });
            });
        meta.updateTag({
            name: 'author',
            content: environment.host
        });
        meta.updateTag({
            name: 'webRoot',
            content: environment.host
        });
        meta.updateTag({
            property: 'og:url',
            content: environment.host,
        });
        meta.updateTag({
            property: 'og:image',
            content: `${environment.host}/assets/images/share-social.jpg`,
        });
        meta.updateTag({
            property: 'og:image:width',
            content: '1200',
        });
        meta.updateTag({
            property: 'og:image:height',
            content: '630',
        });
        meta.updateTag({
            property: 'og:type',
            content: 'website'
        });
    }
}
