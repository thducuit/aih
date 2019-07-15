import { Component, OnInit } from '@angular/core';
import { getLanguage } from 'src/app/utilities';

@Component({
  selector: 'app-home-layout',
  templateUrl: './home-layout.component.html',
  styleUrls: ['./home-layout.component.scss'],
})
export class HomeLayoutComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  get pageClasses() {
    const language = getLanguage();
    return [language, 'window'];
  }
}
