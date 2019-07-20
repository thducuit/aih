import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-doctor-filter',
  templateUrl: './doctor-filter.component.html',
  styleUrls: ['./doctor-filter.component.scss']
})
export class DoctorFilterComponent implements OnInit {

  @Input()
  public doctors: any[];
  constructor() { }

  ngOnInit() {
  }

}
