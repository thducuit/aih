import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-section-doctor',
  templateUrl: './section-doctor.component.html',
  styleUrls: ['./section-doctor.component.scss'],
})
export class SectionDoctorComponent implements OnInit {

  @Input() filterByClinics;

  constructor() {
  }

  ngOnInit() {
  }

}
