import {Component, HostListener, OnInit} from '@angular/core';

@Component({
  selector: 'app-booking-specialty',
  templateUrl: './booking-specialty.component.html',
  styleUrls: ['./booking-specialty.component.scss']
})
export class BookingSpecialtyComponent implements OnInit {

  public isActive: boolean;

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
