import { Component, OnInit } from '@angular/core';
import {UrlService} from '../../services/url.service';

@Component({
  selector: 'app-top-header',
  templateUrl: './top-header.component.html',
  styleUrls: ['./top-header.component.scss']
})
export class TopHeaderComponent implements OnInit {

  constructor(private urlService: UrlService) { }

  ngOnInit() {
  }

}
