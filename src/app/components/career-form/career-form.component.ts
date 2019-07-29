import { Component, OnInit } from '@angular/core';
import {CareerService} from '../../services/career.service';

@Component({
  selector: 'app-career-form',
  templateUrl: './career-form.component.html',
  styleUrls: ['./career-form.component.scss']
})
export class CareerFormComponent implements OnInit {

  public form = {
      fullname: '',
      position: '',
      phone: '',
      email: '',
      content: '',
  };
  constructor(
      public careerService: CareerService
  ) { }

  ngOnInit() {
  }

  submitForm() {
    this.careerService.apply(this.form).subscribe( (data: any) => {
        console.log('form', data);
    });
  }

}
