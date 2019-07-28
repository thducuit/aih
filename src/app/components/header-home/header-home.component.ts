import {
  Component,
  OnInit,
  HostListener,
  AfterViewInit,
  NgZone,
  Inject,
  PLATFORM_ID,
} from '@angular/core';
import jquery from 'jquery';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-header-home',
  templateUrl: './header-home.component.html',
  styleUrls: ['./header-home.component.scss'],
})
export class HeaderHomeComponent {
  constructor() {
  }
}
