import { Component, OnInit } from '@angular/core';
import {UrlService} from '../../../services/url.service';

@Component({
  selector: 'app-section-news',
  templateUrl: './section-news.component.html',
  styleUrls: ['./section-news.component.scss']
})
export class SectionNewsComponent implements OnInit {

  constructor(private urlService: UrlService) { }

  ngOnInit() {
  }

}
