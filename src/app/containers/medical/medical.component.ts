import {Component, OnInit, OnDestroy} from '@angular/core';
import {PageService} from '../../services/page.service';
import {BannerService} from '../../services/banner.service';
import {UrlService} from '../../services/url.service';
import {Page} from '../../models/page';
import {PackageService} from '../../services/package.service';
import {Package} from '../../models/package';
import {Packagechild} from '../../models/packagechild';
import {Meta, Title} from '@angular/platform-browser';
import {forkJoin, Subscription} from 'rxjs';
import {TranslateService} from '@ngx-translate/core';
import {ActivatedRoute} from '@angular/router';
import {LoaderService} from '../../services/loader-service';
import {environment} from '../../../environments/environment';

@Component({
    selector: 'app-medical',
    templateUrl: './medical.component.html',
    styleUrls: ['./medical.component.scss'],
})
export class MedicalComponent implements OnInit, OnDestroy {
    public page: Page;
    public banners: Array<any> = [];
    public currentPackages: Array<any> = [];
    public currentPackageServices: Array<any> = [];
    public packages: Array<any> = [];
    public packageServices: Array<any> = [];
    public isExpand: boolean | false;
    public isExpandChild: boolean | false;
    private subscription: Subscription;

    public chosenPackage;
    public chosenPackageChild;
    public chosenPackageChilds = [];

    constructor(public pageService: PageService,
                public bannerService: BannerService,
                public packageService: PackageService,
                private metaService: Meta,
                private titleService: Title,
                private loaderService: LoaderService,
                private translate: TranslateService,
                private activatedRoute: ActivatedRoute) {
    }

    ngOnInit() {
        this.loadPage();
        this.loadPackages();
        this.subscription = this.translate.onLangChange.subscribe(() => {
            this.loadPage();
            this.loadPackages();
        });
    }

    ngOnDestroy() {
      if (this.subscription) {
        this.subscription.unsubscribe();
      }
    }

    loadPage() {
        this.loaderService.show();
        forkJoin(
            this.pageService.fetch('packagepage'),
            this.translate.get('american_international_hospital'),
        ).subscribe(([data, aihStr]) => {
                const post = data.Post || {};
                const page = new Page(post);
                page.longDesc = UrlService.fixPictureUrl(page.longDesc);
                page.picturePath = UrlService.createPictureUrl(page.picture);
                this.page = page;

                // seo
                const pageTitle = `${this.page.metaTitle || this.page.name} - ${aihStr}`;
                this.titleService.setTitle(pageTitle);
                this.metaService.updateTag({
                    property: 'og:title',
                    content: pageTitle,
                });
                this.metaService.updateTag({
                    name: 'description',
                    content: this.page.metaDesc,
                });
                this.metaService.updateTag({
                    property: 'og:description',
                    content: this.page.metaDesc,
                });
                this.metaService.updateTag({
                    name: 'keywords',
                    content: this.page.metaKey,
                });

                this.metaService.updateTag({property: 'og:url', content: `${environment.host}/patient-services/medical-package`});

                if (this.page.picture) {
                    this.metaService.updateTag({
                        property: 'og:image',
                        content: UrlService.createPictureUrl(this.page.picture),
                    });
                }

                this.bannerService
                    .fetch('packagepage', this.page.id)
                    .subscribe((bannersResp: any) => {
                        const banners = bannersResp.Banner;
                        this.banners = banners.map(banner => {
                            banner.large = UrlService.createMediaUrl(banner.Url);
                            banner.small = banner.large;
                            banner.url = banner.Link;
                            banner.title = banner.title;
                            banner.desc = banner.desc;
                            return banner;
                        });
                    });
            },
            null,
            () => {
                this.loaderService.hide();
            });
    }

    loadPackages() {
        this.loaderService.show();
        this.packageService.fetch().subscribe((data: {}) => {
            const posts = data['Categories'] || [];
            this.packages = posts
                .map(post => {
                    return new Package(post);
                })
                .map( post => {
                    if (post.meta.picture) {
                        post.meta.picture = UrlService.createMediaUrl(post.meta.picture);
                    }
                    return post;
                });

            this.currentPackages = this.packages.filter(item => item.parentId === 0);

            this.packageService.fetchService().subscribe((data2: {}) => {
                const post2s = data2['Categories'] || [];
                this.packageServices = post2s
                    .map(post => {
                        return new Packagechild(post);
                    });

                this.currentPackageServices = this.packageServices.filter(
                    item => item.parentId === 0,
                );
                this.currentPackageServices.map(parentItem => {
                    const children = [];
                    let no = 1;
                    this.packageServices.map(item => {
                        if (item.parentId === parentItem.id) {
                            item.no = no < 10 ? `0${no}` : `${no}`;
                            children.push(item);
                            no += 1;
                        }
                    });
                    parentItem['children'] = children;
                    return parentItem;
                });

                this.activatedRoute.queryParams.subscribe(params => {
                    const p = params['package'];
                    const d = params['detail'];
                    const choosenPackage = (this.chosenPackage = this.currentPackages.find(
                        item => item.id === parseInt(p, 10),
                    ));
                    if (choosenPackage) {
                        choosenPackage.active = true;
                    }
                    this.chosenPackageChild = this.packages.find(
                        item => item.id === parseInt(d, 10),
                    );

                    if (this.chosenPackageChild) {
                        this.chosenPackageChild.active = true;
                    }

                    if (this.chosenPackage) {
                        this.chosenPackageChilds = this.packages.filter(
                            currentPackage => currentPackage.parentId === this.chosenPackage.id,
                        );
                    }
                });

                this.loaderService.hide();
            });
        });
    }

    changeFormat(id) {
        this.currentPackages = this.packages.filter(item => item.parentId === id);
    }

    onExpand() {
        this.isExpand = !this.isExpand;
    }

    resetFormat() {
        this.currentPackages = this.packages.filter(item => item.parentId === 0);
    }

    choosePackage(item) {
        this.chosenPackage = item;
        this.currentPackages = this.currentPackages.map(currentPackage => {
            currentPackage.active = false;
            return currentPackage;
        });
        item.active = true;
        this.chosenPackageChilds = this.packages.filter(
            currentPackage => currentPackage.parentId === item.id,
        );
        this.isExpand = false;
        this.chosenPackageChild = null;
    }

    choosePackageChild(item) {
        this.chosenPackageChild = item;
        this.chosenPackageChilds = this.chosenPackageChilds.map(currentPackage => {
            currentPackage.active = false;
            return currentPackage;
        });
        item.active = true;
        this.isExpandChild = false;
    }

    onExpandChild() {
        this.isExpandChild = !this.isExpandChild;
    }

    onClickOutsideOl() {
        this.isExpandChild = false;
    }

    onClickOutsideUl() {
        this.isExpand = false;
    }
}
