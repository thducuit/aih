import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { SlickCarouselModule } from 'ngx-slick-carousel';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// CONTAINNERS
import { HomeComponent } from './containers/home/home.component';
import { DoctorComponent } from './containers/doctor/doctor.component';

// about
import { AboutComponent } from './containers/abouts/about/about.component';
import { QaComponent } from './containers/abouts/qa/qa.component';
import { TestimonialComponent } from './containers/abouts/testimonial/testimonial.component';
import { ContactComponent } from './containers/contact/contact.component';
import { JobComponent } from './containers/job/job.component';
import { EventComponent } from './containers/news/event/event.component';

// services
import { InsuranceComponent } from './containers/services/insurance/insurance.component';
import { ServiceComponent } from './containers/services/service/service.component';
import { FactsheetComponent } from './containers/services/factsheet/factsheet.component';
import { PackageComponent } from './containers/services/package/package.component';

// COMPONENTS
import { BookingDoctorComponent } from './components/booking-doctor/booking-doctor.component';
import { HotlineComponent } from './components/hotline/hotline.component';
import { LanguageComponent } from './components/language/language.component';
import { MainHeaderComponent } from './components/main-header/main-header.component';
import { NavComponent } from './components/nav/nav.component';
import { NewsletterComponent } from './components/newsletter/newsletter.component';
import { SearchComponent } from './components/search/search.component';
import { VideoComponent } from './containers/news/video/video.component';
import { VideoComponent as VideoComponent2 } from './components/popup/video/video.component';
import { DoctorItemComponent } from './components/slide/doctor/doctor-item/doctor-item.component';
import { NewsItemComponent } from './components/slide/news/news-item/news-item.component';
import { TopHeaderComponent } from './components/top-header/top-header.component';

// SHARED
import { AlertComponent } from './shared/alert/alert.component';
import { ButtonComponent } from './shared/button/button.component';
import { LoadingComponent } from './shared/loading/loading.component';
import { DatepickerComponent } from './shared/datepicker/datepicker.component';
import { InputComponent } from './shared/input/input.component';
import { TimepickerComponent } from './shared/timepicker/timepicker.component';
import { SelectComponent } from './shared/select/select.component';

import { BookingPhoneNumberComponent } from './components/booking-phone-number/booking-phone-number.component';
import { BookingSpecialtyComponent } from './components/booking-specialty/booking-specialty.component';
import { BookingTimeComponent } from './components/booking-time/booking-time.component';
import { BookingDateComponent } from './components/booking-date/booking-date.component';
import { BookingComponent } from './components/booking/booking.component';
import { WebTitleComponent } from './components/web-title/web-title.component';
import { BannerComponent } from './components/banner/banner.component';
import { BookingMobileComponent } from './components/booking-mobile/booking-mobile.component';
import { BookingHomeComponent } from './components/booking-home/booking-home.component';
import { DoctorSlideComponent } from './components/slide/doctor/doctor-slide/doctor-slide.component';
import { NewsSlideComponent } from './components/slide/news/news-slide/news-slide.component';
import { FooterComponent } from './components/footer/footer.component';
import { BackToTopComponent } from './components/back-to-top/back-to-top.component';
import { SuccessComponent } from './components/popup/success/success.component';
import { ChatComponent } from './components/chat/chat.component';
import { HomeLayoutComponent } from './layouts/home-layout/home-layout.component';
import { PageLayoutComponent } from './layouts/page-layout/page-layout.component';
import { HeaderHomeComponent } from './components/header-home/header-home.component';
import { LogoComponent } from './components/logo/logo.component';
import { SpecialtyItemComponent } from './components/booking-specialty/specialty-item/specialty-item.component';
import { DoctorListItemComponent } from './components/booking-doctor/doctor-list-item/doctor-list-item.component';
import { SectionNewsComponent } from './components/section/section-news/section-news.component';
import { SectionDoctorComponent } from './components/section/section-doctor/section-doctor.component';
import { SectionBookingHomeComponent } from './components/section/section-booking-home/section-booking-home.component';
import { SectionBookingMbComponent } from './components/section/section-booking-mb/section-booking-mb.component';
import { SectionMapComponent } from './components/section/section-map/section-map.component';
import { SectionPartnerComponent } from './components/section/section-partner/section-partner.component';
import { SectionTestimoComponent } from './components/section/section-testimo/section-testimo.component';
import { ChoosenPackageComponent } from './components/choosen-package/choosen-package.component';
import { HeaderPageComponent } from './components/header-page/header-page.component';
import { CareerComponent } from './containers/career/career.component';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,

    // Layouts
    HomeLayoutComponent,
    PageLayoutComponent,

    // containers
    HomeComponent,
    DoctorComponent,

    QaComponent,
    AboutComponent,
    TestimonialComponent,

    EventComponent,
    VideoComponent,
    JobComponent,
    ContactComponent,
    CareerComponent,

    ServiceComponent,
    InsuranceComponent,
    FactsheetComponent,
    PackageComponent,

    // shared
    LoadingComponent,
    InputComponent,
    SelectComponent,
    DatepickerComponent,
    TimepickerComponent,
    AlertComponent,
    ButtonComponent,

    // components
    HotlineComponent,
    TopHeaderComponent,
    MainHeaderComponent,
    BookingDoctorComponent,
    SearchComponent,
    VideoComponent2,
    LanguageComponent,
    NewsletterComponent,
    NavComponent,
    DoctorItemComponent,
    NewsItemComponent,
    BookingPhoneNumberComponent,
    BookingSpecialtyComponent,
    BookingTimeComponent,
    BookingDateComponent,
    BookingComponent,
    WebTitleComponent,
    BannerComponent,
    BookingMobileComponent,
    BookingHomeComponent,
    DoctorSlideComponent,
    NewsSlideComponent,
    FooterComponent,
    BackToTopComponent,
    SuccessComponent,
    ChatComponent,
    HeaderHomeComponent,
    LogoComponent,
    SpecialtyItemComponent,
    DoctorListItemComponent,
    SectionNewsComponent,
    SectionDoctorComponent,
    SectionBookingHomeComponent,
    SectionBookingMbComponent,
    SectionMapComponent,
    SectionPartnerComponent,
    SectionTestimoComponent,
    ChoosenPackageComponent,
    HeaderPageComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
    }),
    SlickCarouselModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
