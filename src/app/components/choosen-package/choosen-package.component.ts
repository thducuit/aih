import { Component, OnInit, OnDestroy } from '@angular/core';
import { PageService } from '../../services/page.service';
import { BannerService } from '../../services/banner.service';
import { UrlService } from '../../services/url.service';
import { Page } from '../../models/page';
import { PackageService } from '../../services/package.service';
import { Package } from '../../models/package';
import { Packagechild } from '../../models/packagechild';
import { Meta, Title } from '@angular/platform-browser';
import { forkJoin, Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';

@Component({
  selector: 'app-choosen-package',
  templateUrl: './choosen-package.component.html',
  styleUrls: ['./choosen-package.component.scss'],
  animations: [
    trigger('slideInOut', [
      state(
        'close',
        style({
          'max-height': 0,
        }),
      ),
      state(
        'open',
        style({
          'max-height': '164px',
        }),
      ),
      transition('close => open', [animate('300ms ease-in-out')]),
      transition('open => close', [animate('300ms ease-in-out')]),
    ]),
  ],
})
export class ChoosenPackageComponent implements OnInit, OnDestroy {
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

  public packageState = 'close';
  public packageDetailState = 'close';

  constructor(
    public packageService: PackageService,
    private translate: TranslateService,
    private urlService: UrlService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.loadPackages();
    this.subscription = this.translate.onLangChange.subscribe(() => {
      this.chosenPackage = null;
      this.chosenPackageChild = null;
      this.chosenPackageChilds = [];
      this.loadPackages();
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  loadPackages() {
    this.packageService.fetch().subscribe((data: {}) => {
      const posts = data['Categories'] || [];
      this.packages = posts
        .map(post => {
          return new Package(post);
        })
        .sort((obj1, obj2) => (obj1.sort >= obj2.sort ? 1 : -1));

      this.currentPackages = this.packages.filter(item => item.parentId === 0);
    });
  }

  handleInputClick() {
    this.packageState = this.packageState === 'open' ? 'close' : 'open';
  }

  handleInputChildClick() {
    this.packageDetailState =
      this.packageDetailState === 'close' ? 'open' : 'close';
  }

  onClickOutside(e) {
    this.packageState = 'close';
  }

  onClickOutsideChild(e) {
    this.packageDetailState = 'close';
  }

  chooseParent(item) {
    this.chosenPackage = item;
    this.chosenPackageChilds = this.packages.filter(
      child => child.parentId === item.id,
    );
    this.chosenPackageChild = null;
    this.packageState = 'close';
  }

  chooseChild(item) {
    this.chosenPackageChild = item;
    this.packageDetailState = 'close';
  }

  gotoDetail() {
    const choosenPackage = this.chosenPackage;
    const choosenChild = this.chosenPackageChild;
    if (!choosenPackage || !choosenChild) {
      return;
    }
    const url = this.urlService.getUrlByKey('mpackage') + `?package=${
      choosenPackage.id
      }&detail=${choosenChild.id}`;
    this.router.navigateByUrl(url).then(e => {
    });
  }
}
