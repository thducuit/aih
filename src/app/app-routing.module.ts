import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {HomeComponent} from './containers/home/home.component';
import {AboutComponent} from './containers/abouts/about/about.component';

import {HomeLayoutComponent} from './layouts/home-layout/home-layout.component';
import {PageLayoutComponent} from './layouts/page-layout/page-layout.component';
import { QaComponent } from './containers/abouts/qa/qa.component';
import { TestimonialComponent } from './containers/abouts/testimonial/testimonial.component';
import { ServiceComponent } from './containers/services/service/service.component';
import { InsuranceComponent } from './containers/services/insurance/insurance.component';
import { DoctorComponent } from './containers/doctor/doctor.component';
import { VideoComponent } from './containers/news/video/video.component';
import { EventComponent } from './containers/news/event/event.component';

const routes: Routes = [
  {
    path: '',
    component: HomeLayoutComponent,
    children: [
      {path: '', component: HomeComponent, pathMatch: 'full'}
    ]
  },
  {
    path: '',
    component: PageLayoutComponent,
    children: [
      { path: 'about-us/aih-hospital', component: AboutComponent },
      { path: 'about-us/faq', component: QaComponent },
      { path: 'about-us/testimonial', component: TestimonialComponent },
      { path: 'patient-services/medical-services', component: ServiceComponent },
      { path: 'patient-services/medical-package', component: ServiceComponent },
      { path: 'patient-services/insurance', component: InsuranceComponent },
      { path: 'patient-services/factsheet', component: ServiceComponent },
      { path: 'doctor', component: DoctorComponent },
      { path: 'news', component: EventComponent },
      { path: 'videos', component: VideoComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    enableTracing: true,
    useHash: false
  })],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {
}
