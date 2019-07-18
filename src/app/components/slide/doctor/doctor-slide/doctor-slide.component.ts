import { Component, OnInit } from '@angular/core';
import { DoctorService } from 'src/app/services/doctor.service';
import { Doctor } from 'src/app/models/doctor';

@Component({
  selector: 'app-doctor-slide',
  templateUrl: './doctor-slide.component.html',
  styleUrls: ['./doctor-slide.component.scss'],
})
export class DoctorSlideComponent implements OnInit {
  public doctors: Doctor[];
  public slideConfig = {
    infinite: true,
    slideToShow: 4,
    slidesToScroll: 4,
    arrows: false,
    autoplay: false,
    autoplaySpeed: 5000,
    responsive: [
      {
        breakpoint: 1023,
        settings: {
          slideToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 767,
        settings: 'unslick'
      }
    ],
  };

  constructor(private doctorService: DoctorService) {}

  ngOnInit() {
    this.loadDoctors();
  }

  loadDoctors() {
    this.doctorService.fetch().subscribe((data: any) => {
      const posts = data.Posts || [];
      this.doctors = posts.map(post => new Doctor(post));
    });
  }
}
