import {Component, OnInit} from '@angular/core';
import { Partner } from '../../../models/partner';
import { UrlService } from '../../../services/url.service';
import { PartnerService } from '../../../services/partner.service';

@Component({
  selector: 'app-section-partner',
  templateUrl: './section-partner.component.html',
  styleUrls: ['./section-partner.component.scss']
})
export class SectionPartnerComponent implements OnInit {

  public partners: Array<Partner> = [];
  constructor(public partnerService: PartnerService) {}

  ngOnInit() {
    this.loadPartners();
  }

  loadPartners() {
    this.partnerService.fetch().subscribe((data: any) => {
      const posts = data.Media || [];
      this.partners = posts.map(post => {
        const partner = new Partner(post);
        partner.thumb = UrlService.createMediaUrl(partner.thumb);
        return partner;
      });
    });
  }

}
