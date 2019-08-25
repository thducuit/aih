import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './containers/home/home.component';
import { AboutComponent } from './containers/abouts/about/about.component';

import { PageLayoutComponent } from './layouts/page-layout/page-layout.component';
import { QaComponent } from './containers/abouts/qa/qa.component';
import { TestimonialComponent } from './containers/abouts/testimonial/testimonial.component';
import { ServiceComponent } from './containers/services/service/service.component';
import { InsuranceComponent } from './containers/services/insurance/insurance.component';
import { FactsheetComponent } from './containers/services/factsheet/factsheet.component';
import { DoctorComponent } from './containers/doctor/doctor.component';
import { VideoComponent } from './containers/news/video/video.component';
import { EventComponent } from './containers/news/event/event.component';
import { CareerComponent } from './containers/career/career.component';
import { ContactComponent } from './containers/contact/contact.component';
import { MedicalComponent } from './containers/medical/medical.component';
import { SearchComponent } from './containers/search/search.component';

// account
import { SettingComponent } from './containers/account/setting/setting.component';
import { InformationComponent } from './containers/account/information/information.component';
import { VoteComponent } from './containers/account/vote/vote.component';
import { ScheduleHistoryComponent } from './containers/account/schedule-history/schedule-history.component';
import { ScheduleComponent } from './containers/account/schedule/schedule.component';
import { ScheduleCancelComponent } from './containers/account/schedule-cancel/schedule-cancel.component';
import { ScheduleRegisterComponent } from './containers/account/schedule-register/schedule-register.component';
import { LoginComponent } from './containers/account/login/login.component';
import { RegisterComponent } from './containers/account/register/register.component';
import { NewsDetailComponent } from './containers/news/news-detail/news-detail.component';
import { DoctorDetailComponent } from './containers/doctor/doctor-detail/doctor-detail.component';
import { ServiceDetailComponent } from './containers/services/service/service-detail/service-detail.component';
import { CareerDetailComponent } from './containers/career/career-detail/career-detail.component';
import { InsuranceMembershipComponent } from './containers/insurance/insurance-membership/insurance-membership.component';
import { InsuranceConsultingComponent } from './containers/insurance/insurance-consulting/insurance-consulting.component';
import { InsuranceDetailComponent } from './containers/insurance/insurance-detail/insurance-detail.component';
import { MembershipConsultingComponent } from './containers/insurance/membership-consulting/membership-consulting.component';
import { MembershipComponent } from './containers/insurance/membership/membership.component';

const routes: Routes = [
  {
    path: 'about-us',
    component: PageLayoutComponent,
    children: [
      {
        path: 'aih-hospital',
        component: AboutComponent,
      },
      {
        path: 'faq',
        component: QaComponent,
      },
      {
        path: 'testimonial',
        component: TestimonialComponent,
      },
    ],
  },
  {
    path: 'patient-services',
    component: PageLayoutComponent,
    children: [
      {
        path: 'medical-services',
        component: ServiceComponent,
      },
      {
        path: 'medical-services/:alias',
        component: ServiceDetailComponent,
      },
      {
        path: 'medical-package',
        component: MedicalComponent,
      },
      {
        path: 'insurance',
        component: InsuranceComponent,
      },
      {
        path: 'factsheet',
        component: FactsheetComponent,
      },
    ],
  },
  {
    path: 'doctor',
    component: PageLayoutComponent,
    children: [
      {
        path: 'detail/:alias',
        component: DoctorDetailComponent,
      },
      {
        path: '',
        component: DoctorComponent,
      },
    ],
  },
  {
    path: 'news',
    component: PageLayoutComponent,
    children: [
      {
        path: 'detail/:alias',
        component: NewsDetailComponent,
      },
      {
        path: '',
        component: EventComponent,
      },
    ],
  },
  {
    path: 'videos',
    component: PageLayoutComponent,
    children: [
      {
        path: '',
        component: VideoComponent,
      },
    ],
  },
  {
    path: 'career',
    component: PageLayoutComponent,
    children: [
      {
        path: 'detail/:alias',
        component: CareerDetailComponent,
      },
      { path: '', component: CareerComponent },
    ],
  },
  {
    path: 'contact',
    component: PageLayoutComponent,
    children: [
      {
        path: '',
        component: ContactComponent,
      },
    ],
  },
  {
    path: 'medical',
    component: PageLayoutComponent,
    children: [
      {
        path: '',
        component: MedicalComponent,
      },
    ],
  },
  {
    path: 'search',
    component: PageLayoutComponent,
    children: [
      {
        path: '',
        component: SearchComponent,
      },
    ],
  },
  {
    path: 'account',
    component: PageLayoutComponent,
    children: [
      {
        path: 'setting',
        component: SettingComponent,
      },
      {
        path: 'information',
        component: InformationComponent,
      },
      {
        path: 'vote',
        component: VoteComponent,
      },
      {
        path: 'schedule-history',
        component: ScheduleHistoryComponent,
      },
      {
        path: 'schedule-cancel',
        component: ScheduleCancelComponent,
      },
      {
        path: 'schedule-register',
        component: ScheduleRegisterComponent,
      },
      {
        path: 'schedule',
        component: ScheduleComponent,
      },
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'register',
        component: RegisterComponent,
      },
    ],
  },
  {
    path: 'insurance',
    component: PageLayoutComponent,
    children: [
      {
        path: 'insurance-membership',
        component: InsuranceMembershipComponent,
      },
      {
        path: 'insurance-consulting/:id',
        component: InsuranceConsultingComponent,
      },
      {
        path: 'insurance-detail/:alias',
        component: InsuranceDetailComponent,
      },
      {
        path: 'membership-consulting/:id',
        component: MembershipConsultingComponent,
      },
      { path: 'membership/:alias', component: MembershipComponent },
    ],
  },
  {
    path: '**',
    component: HomeComponent,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      enableTracing: false,
      useHash: false,
    }),
  ],
  exports: [RouterModule],
  providers: [],
})
export class AppRoutingModule {}
