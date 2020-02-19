import { Component, OnInit, OnDestroy } from '@angular/core';
import { Partner } from '../../../models/partner';
import { UrlService } from '../../../services/url.service';
import { PartnerService } from '../../../services/partner.service';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-section-partner',
  templateUrl: './section-partner.component.html',
  styleUrls: ['./section-partner.component.scss']
})
export class SectionPartnerComponent implements OnInit, OnDestroy {
  public partners: Array<Partner> = [];
  public deferLoaded = false;

  private subscription: Subscription;

  constructor(
    public partnerService: PartnerService,
    private translate: TranslateService
  ) { }

  ngOnInit() {
    this.loadPartners();
    this.subscription = this.translate
      .onLangChange
      .subscribe(() => {
        this.loadPartners();
      });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  loadPartners() {
    this.partnerService
      .fetch()
      .subscribe((data: any) => {
        const posts = data.Media || [];
        this.partners = posts.map(post => {
          const partner = new Partner(post);
          partner.thumb = UrlService.createMediaUrl(partner.thumb);
          return partner;
        });
      });
  }

}
