import { Component, OnInit, OnDestroy } from '@angular/core';
import { Page } from '../../models/page';
import { PageService } from '../../services/page.service';
import { BannerService } from '../../services/banner.service';
import { UrlService } from '../../services/url.service';
import { Meta, Title } from '@angular/platform-browser';
import { forkJoin, Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { TranslateService } from '@ngx-translate/core';
import { ContactService } from '../../services/contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit, OnDestroy {
  public page: Page;
  public banners: Array<any> = [];

  public doctorPoint = 0;
  public servicePoint = 0;
  public faciPoint = 0;
  public pricePoint = 0;

  public content;
  public isReset;
  public showVote;

  private subscription: Subscription;

  constructor(
    public pageService: PageService,
    public bannerService: BannerService,
    private metaService: Meta,
    private titleService: Title,
    private translate: TranslateService,
    public contactService: ContactService,
  ) {}

  ngOnInit() {
    this.loadPage();
    this.subscription = this.translate.onLangChange.subscribe(() => {
      this.loadPage();
    });
    this.isReset = false;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  loadPage() {
    forkJoin(
      this.pageService.fetch('contact_page'),
      this.translate.get('american_international_hospital'),
    ).subscribe(([data, aihStr]) => {
      const post = data.Post || {};
      const page = new Page(post);
      page.longDesc = UrlService.fixPictureUrl(page.longDesc);
      page.picturePath = UrlService.createPictureUrl(page.picture);
      this.page = page;
      // seo
      const pageTitle = `${this.page.name} - ${aihStr}`;
      this.titleService.setTitle(pageTitle);
      this.metaService.updateTag({
        property: 'og:title',
        content: pageTitle,
      });
      this.page.metaDesc &&
        this.metaService.updateTag({
          name: 'description',
          content: this.page.metaDesc,
        });
      this.page.metaDesc &&
        this.metaService.updateTag({
          property: 'og:description',
          content: this.page.metaDesc,
        });
      this.metaService.updateTag({
        name: 'keywords',
        content: this.page.metaKey,
      });

      if(this.page.picture) {
            this.metaService.updateTag({
              property: 'og:image',
              content: UrlService.createPictureUrl(this.page.picture),
            });
      }

      this.showVote = parseInt(this.page.meta['enable_rating'], 10) === 1;

      this.bannerService
        .fetch('contact_page', this.page.id)
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

  openAlert() {
    forkJoin(
      this.translate.get('text_contact_rating_require'),
      this.translate.get('text_close'),
    ).subscribe(([message, buttonText]) => {
      Swal.fire({
        text: message,
        confirmButtonText: buttonText,
      });
    });
  }

  openSuccess() {
    forkJoin(
      this.translate.get('text_contact_rating_success'),
      this.translate.get('text_close'),
    ).subscribe(([message, buttonText]) => {
      Swal.fire({
        text: message,
        confirmButtonText: buttonText,
      });
      this.content = '';
      this.isReset = true;
      setTimeout(() => {
        this.isReset = false;
      }, 100);
    });
  }

  openFail() {
    forkJoin(
      this.translate.get('text_contact_rating_fail'),
      this.translate.get('text_close'),
    ).subscribe(([message, buttonText]) => {
      Swal.fire({
        text: message,
        confirmButtonText: buttonText,
      });
    });
  }

  submitRatingForm() {
    if (
      !this.doctorPoint &&
      !this.servicePoint &&
      !this.faciPoint &&
      !this.pricePoint
    ) {
      this.openAlert();
      return;
    }

    this.contactService
      .rating({
        doctor: this.doctorPoint,
        service: this.servicePoint,
        facilities: this.faciPoint,
        price: this.pricePoint,
        content: this.content,
      })
      .subscribe((data: any) => {
        this.openSuccess();
      });
  }

  takePointDoctor(point) {
    this.doctorPoint = point;
  }

  takePointService(point) {
    this.servicePoint = point;
  }

  takePointFaci(point) {
    this.faciPoint = point;
  }

  takePointPrice(point) {
    this.pricePoint = point;
  }
}
