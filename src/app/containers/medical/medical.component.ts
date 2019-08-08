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

@Component({
    selector: 'app-medical',
    templateUrl: './medical.component.html',
    styleUrls: ['./medical.component.scss']
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
                private translate: TranslateService) {
    }

    ngOnInit() {
        this.loadPage();
        this.loadPackages();
        this.subscription = this.translate
            .onLangChange
            .subscribe(() => {
                this.loadPage();
                this.loadPackages();
            });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    loadPage() {
        forkJoin(
            this.pageService
                .fetch('packagepage'),
            this.translate.get('american_international_hospital'),
        )
            .subscribe(([data, aihStr]) => {
                const post = data.Post || {};
                const page = new Page(post);
                page.longDesc = UrlService.fixPictureUrl(page.longDesc);
                page.picturePath = UrlService.createPictureUrl(page.picture);
                this.page = page;
                // seo
                this.titleService.setTitle(`${this.page.name} - ${aihStr}`);
                this.metaService.addTag({name: 'description', content: this.page.metaDesc});
                this.metaService.addTag({name: 'keywords', content: this.page.metaKey});
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
            });
    }

    loadPackages() {
        this.packageService.fetch().subscribe((data: {}) => {
            const posts = data['Categories'] || [];
            this.packages = posts.map(post => {
                return new Package(post);
            }).sort((obj1, obj2) => obj1.sort >= obj2.sort ? 1 : -1);

            this.currentPackages = this.packages.filter(item => item.parentId === 0);
            this.packageService.fetchService().subscribe((data2: {}) => {
                const post2s = data2['Categories'] || [];
                this.packageServices = post2s.map(post => {
                    return new Packagechild(post);
                }).sort((obj1, obj2) => obj1.sort >= obj2.sort ? 1 : -1);
                this.currentPackageServices = this.packageServices.filter(item => item.parentId === 0);
                this.currentPackageServices.map(parentItem => {
                    const children = [];
                    let no = 1;
                    this.packageServices.map((item) => {
                        if (item.parentId === parentItem.id) {
                            item.no = no < 10 ? `0${no}` : `${no}`;
                            children.push(item);
                            no += 1;
                        }
                    });
                    parentItem['children'] = children;
                    return parentItem;
                });
                
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
        this.chosenPackageChilds = this.packages.filter(currentPackage => currentPackage.parentId === item.id);
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
