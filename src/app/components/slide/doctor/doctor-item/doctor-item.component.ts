import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DoctorService } from '../../../../services/doctor.service';
import { Doctor } from '../../../../models/doctor';
import { UrlService } from '../../../../services/url.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-doctor-item',
  templateUrl: './doctor-item.component.html',
  styleUrls: ['./doctor-item.component.scss'],
})
export class DoctorItemComponent implements OnInit {
  public doctors: Array<Doctor> = [];
  public slideConfig = {
    infinite: true,
    slidesToShow: 4,
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

  @ViewChild('sliderContainer', { static: false })
  sliderContainer: ElementRef;

  constructor(
    public doctorService: DoctorService,
    private translate: TranslateService
    ) {}

  ngOnInit() {
    this.loadDoctors();
    this.translate
    .onLangChange
    .subscribe(() => {
      this.loadDoctors();
    });
  }

  sliderInit(e) {
    this.sliderContainer.nativeElement.style.opacity = 1;
  }

  loadDoctors() {
    this.doctorService.fetch().subscribe((data: any) => {
      const posts = data.Posts || [];
      this.doctors = posts.map(post => {
        const doctor = new Doctor(post);
        if (doctor.picture) {
          doctor.picturePath = UrlService.createPictureUrl(doctor.picture);
        }
        doctor.url = UrlService.createDoctorDetailUrl(doctor.alias);
        return doctor;
      });
    });
  }
}
