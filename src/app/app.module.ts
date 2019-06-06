import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoadingComponent } from './shared/loading/loading.component';
import { InputComponent } from './shared/input/input.component';
import { SelectComponent } from './shared/select/select.component';
import { DatepickerComponent } from './shared/datepicker/datepicker.component';
import { TimepickerComponent } from './shared/timepicker/timepicker.component';
import { AlertComponent } from './shared/alert/alert.component';
import { ButtonComponent } from './shared/button/button.component';
import { DoctorItemComponent } from './shared/slide/doctor/doctor-item/doctor-item.component';
import { NewsItemComponent } from './shared/slide/news/news-item/news-item.component';
import { BookingPackageServiceComponent } from './shared/booking-package-service/booking-package-service.component';
import { NewsComponent } from './shared/slide/news/news/news.component';
import { DoctorComponent } from './shared/slide/doctor/doctor/doctor.component';
import { SearchComponent } from './shared/search/search.component';
import { LanguageComponent } from './shared/language/language.component';
import { NewsletterComponent } from './shared/newsletter/newsletter.component';
import { NavComponent } from './nav/nav.component';
import { QaComponent } from './abouts/qa/qa.component';
import { TestimonialComponent } from './abouts/testimonial/testimonial.component';
import { AboutComponent } from './abouts/about/about.component';
import { SpecialistComponent } from './services/specialist/specialist.component';
import { ServiceComponent } from './services/service/service.component';
import { InsuranceComponent } from './services/insurance/insurance.component';
import { InformationComponent } from './services/information/information.component';
import { EventComponent } from './news/event/event.component';
import { VideoComponent } from './news/video/video.component';
import { JobComponent } from './job/job.component';
import { ContactComponent } from './contact/contact.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoadingComponent,
    InputComponent,
    SelectComponent,
    DatepickerComponent,
    TimepickerComponent,
    AlertComponent,
    ButtonComponent,
    DoctorItemComponent,
    NewsItemComponent,
    BookingPackageServiceComponent,
    NewsComponent,
    DoctorComponent,
    SearchComponent,
    LanguageComponent,
    NewsletterComponent,
    NavComponent,
    QaComponent,
    AboutComponent,
    TestimonialComponent,
    SpecialistComponent,
    ServiceComponent,
    InsuranceComponent,
    InformationComponent,
    EventComponent,
    VideoComponent,
    JobComponent,
    ContactComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
