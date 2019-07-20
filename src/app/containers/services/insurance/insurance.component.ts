import { Component, OnInit } from '@angular/core';
import {Insurance} from '../../../models/insurance';
import {InsuranceService} from '../../../services/insurance.service';
import {UrlService} from "../../../services/url.service";

@Component({
  selector: 'app-insurance',
  templateUrl: './insurance.component.html',
  styleUrls: ['./insurance.component.scss']
})
export class InsuranceComponent implements OnInit {

  public insurances: Array<Insurance> = [];
  constructor(public insuranceService: InsuranceService) { }

  ngOnInit() {
    this.loadInsurances();
  }

  loadInsurances() {
    this.insuranceService.fetch().subscribe((data: {}) => {
      const posts = data['Categories'] || [];
      const mapping = [];
      const insurances =  posts.map( post => {
        const insurance = new Insurance(post);
        if (insurance.parentId === 0) {
          mapping[insurance.id] = insurance;
        }
        return insurance;
      });
      // mapping child with parent
      insurances.map( insurance => {
        if (mapping[insurance.parentId]) {
          if (!mapping[insurance.parentId].child) {
            mapping[insurance.parentId].child = [];
          }
          const picturePath = UrlService.createPictureUrl(insurance.picture, null, 'category');
          mapping[insurance.parentId].child.push(picturePath);
        }
        return insurance;
      });
      // chunk
      const newMapping = [];
      mapping.map(insurance => {
        if (insurance.child) {
          insurance.child = this.chunk(insurance.child, 8);
        }
        if (insurance) {
          newMapping.push(insurance);
        }
        return insurance;
      });
      this.insurances = newMapping;
      console.log('this.insurances', this.insurances);
    });
  }

  private chunk(array, size) {
    const chunkedArr = [];
    let index = 0;
    while (index < array.length) {
      chunkedArr.push(array.slice(index, size + index));
      index += size;
    }
    return chunkedArr;
  }

}
