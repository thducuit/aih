import {Component, HostListener, OnInit} from '@angular/core';

@Component({
  selector: 'app-booking-time',
  templateUrl: './booking-time.component.html',
  styleUrls: ['./booking-time.component.scss']
})
export class BookingTimeComponent implements OnInit {

  public isActive: boolean;
  public placeholder: string;
  private wasInside = false;
  @HostListener('click')
  clickInside() {
    this.wasInside = true;
  }

  @HostListener('document:click')
  clickout() {
    if (!this.wasInside) {
      this.isActive = false;
    }
    this.wasInside = false;
  }

  constructor() {
    this.isActive = false;
  }

  ngOnInit() {

  }

  handleInputClick() {
    this.isActive = true;
  }

}
