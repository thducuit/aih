import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {UrlService} from '../../services/url.service';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss'],
})
export class SearchFormComponent implements OnInit {
  public isOpen = false;
  public keyword;

  constructor(
      private router: Router,
      private urlService: UrlService
  ) {}

  ngOnInit() {}

  open() {
    this.isOpen = true;
  }

  close() {
    this.isOpen = false;
  }

  gotoSearch() {
    const url = this.urlService.getUrlByKey('search') + `?keyword=${this.keyword}`;
    this.router.navigateByUrl(url).then(e => {});
    this.isOpen = false;
  }
}
