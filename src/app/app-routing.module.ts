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
import { FactsheetComponent } from './containers/services/factsheet/factsheet.component';
import { PackageComponent } from './containers/services/package/package.component';
import { DoctorComponent } from './containers/doctor/doctor.component';
import { VideoComponent } from './containers/news/video/video.component';
import { EventComponent } from './containers/news/event/event.component';
import { CareerComponent } from './containers/career/career.component';
import { ContactComponent } from './containers/contact/contact.component';
import { MedicalComponent } from './containers/medical/medical.component';

// account
import { SettingComponent } from './containers/account/setting/setting.component';
import { InformationComponent } from './containers/account/information/information.component';
import { VoteComponent } from './containers/account/vote/vote.component';
import { ScheduleHistoryComponent } from './containers/account/schedule-history/schedule-history.component';
import {ScheduleComponent} from './containers/account/schedule/schedule.component';
import {ScheduleCancelComponent} from './containers/account/schedule-cancel/schedule-cancel.component';
import {ScheduleRegisterComponent} from './containers/account/schedule-register/schedule-register.component';
import {LoginComponent} from './containers/account/login/login.component';
import {RegisterComponent} from './containers/account/register/register.component';

const routes: Routes = [
  {
    path: '',
    component: HomeLayoutComponent,
    children: [
      { path: '', component: HomeComponent, pathMatch: 'full' }
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
      { path: 'patient-services/medical-package', component: PackageComponent },
      { path: 'patient-services/insurance', component: InsuranceComponent },
      { path: 'patient-services/factsheet', component: FactsheetComponent },
      { path: 'doctor', component: DoctorComponent },
      { path: 'news', component: EventComponent },
      { path: 'videos', component: VideoComponent },
      { path: 'career', component: CareerComponent },
      { path: 'contact', component: ContactComponent },
      { path: 'medical', component: MedicalComponent },

      // account
      { path: 'account/setting', component: SettingComponent },
      { path: 'account/information', component: InformationComponent },
      { path: 'account/vote', component: VoteComponent },
      { path: 'account/schedule-history', component: ScheduleHistoryComponent },
      { path: 'account/schedule-cancel', component: ScheduleCancelComponent },
      { path: 'account/schedule-register', component: ScheduleRegisterComponent },
      { path: 'account/schedule', component: ScheduleComponent },
      { path: 'account/login', component: LoginComponent },
      { path: 'account/register', component: RegisterComponent },
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
