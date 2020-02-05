import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-nav-item',
  templateUrl: './nav-item.component.html',
  styleUrls: ['./nav-item.component.scss'],
})
export class NavItemComponent implements OnInit {
  expaned = false;

  @Input()
  public name: string;
  @Input()
  public routeUrl: string;
  @Input()
  public outerUrl: string;
  @Input()
  public routeActiveClass = 'active';
  @Input()
  public routeOptions = { exact: false };
  @Input()
  public hasChild = false;

  constructor() {}

  ngOnInit() {}

  toggleSubNav(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.expaned = !this.expaned;
  }
}
