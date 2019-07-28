import {Component, OnInit} from '@angular/core';
import {PageService} from '../../services/page.service';
import {BannerService} from '../../services/banner.service';
import {UrlService} from '../../services/url.service';
import {Page} from '../../models/page';
import {PackageService} from '../../services/package.service';
import {Package} from '../../models/package';
import {Packagechild} from '../../models/packagechild';

@Component({
    selector: 'app-medical',
    templateUrl: './medical.component.html',
    styleUrls: ['./medical.component.scss']
})
export class MedicalComponent implements OnInit {

    public page: Page;
    public banners: Array<any> = [];
    public currentPackages: Array<any> = [];
    public currentPackageServices: Array<any> = [];
    public packages: Array<any> = [];
    public packageServices: Array<any> = [];
    public isExpand: boolean | false;

    constructor(public pageService: PageService,
                public bannerService: BannerService,
                public packageService: PackageService) {
    }

    ngOnInit() {
        this.loadPage();
        this.loadPackages();
    }

    loadPage() {
        this.pageService.fetch('packagepage').subscribe((data: any) => {
            const post = data.Post || {};
            const page = new Page(post);
            page.longDesc = UrlService.fixPictureUrl(page.longDesc);
            page.picturePath = UrlService.createPictureUrl(page.picture);
            this.page = page;

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
                            item.no = no < 9 ? `0${no}` : no;
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

}
