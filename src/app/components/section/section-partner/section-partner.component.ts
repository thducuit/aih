import { Component, OnInit } from '@angular/core';
import { Partner } from '../../../models/partner';
import { UrlService } from '../../../services/url.service';
import { PartnerService } from '../../../services/partner.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-section-partner',
  templateUrl: './section-partner.component.html',
  styleUrls: ['./section-partner.component.scss']
})
export class SectionPartnerComponent implements OnInit {

  public partners: Array<Partner> = [];
  constructor(
    public partnerService: PartnerService,
    private translate: TranslateService
  ) { }

  ngOnInit() {
    this.loadPartners();
    this.translate
      .onLangChange
      .subscribe(() => {
        this.loadPartners();
      });
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
