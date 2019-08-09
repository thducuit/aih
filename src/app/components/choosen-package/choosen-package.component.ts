import { Component, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-choosen-package',
  templateUrl: './choosen-package.component.html',
  styleUrls: ['./choosen-package.component.scss'],
})
export class ChoosenPackageComponent implements OnInit {
  public isActive: boolean;
  public isActiveChild: boolean;

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

  constructor(
    public packageService: PackageService,
    private translate: TranslateService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.loadPackages();
    this.subscription = this.translate.onLangChange.subscribe(() => {
      this.loadPackages();
    });
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
    this.isActive = true;
  }

  handleInputChildClick() {
    this.isActiveChild = true;
  }

  onClickOutside(e) {
    this.isActive = false;
  }

  onClickOutsideChild(e) {
    this.isActiveChild = false;
  }

  chooseParent(item) {
    this.chosenPackage = item;
    this.chosenPackageChilds = this.packages.filter(
      child => child.parentId === item.id,
    );
    this.chosenPackageChild = null;
    this.isActive = false;
  }

  chooseChild(item) {
    this.chosenPackageChild = item;
    this.isActiveChild = false;
  }

  gotoDetail() {
    const choosenPackage = this.chosenPackage;
    const choosenChild = this.chosenPackageChild;
    if (!choosenPackage || !choosenChild) {
      return;
    }
    const url = `/patient-services/medical-package?package=${
      choosenPackage.id
    }&detail=${choosenChild.id}`;
    this.router.navigateByUrl(url).then(e => {});
  }
}
