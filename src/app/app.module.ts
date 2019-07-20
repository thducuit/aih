import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { SlickCarouselModule } from 'ngx-slick-carousel';
import { AgmCoreModule } from '@agm/core';
// import { NgScrollbarModule } from 'ngx-scrollbar';
import { DecodeHtmlEntitiesModule } from 'decode-html-entities';

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
import { SettingComponent } from './containers/account/setting/setting.component';
import { RegisterComponent } from './containers/account/register/register.component';
import { LoginComponent } from './containers/account/login/login.component';
import { SupportComponent } from './containers/account/support/support.component';
import { ScheduleComponent } from './containers/account/schedule/schedule.component';
import { ScheduleRegisterComponent } from './containers/account/schedule-register/schedule-register.component';
import { ScheduleHistoryComponent } from './containers/account/schedule-history/schedule-history.component';
import { NotificationComponent } from './containers/account/notification/notification.component';
import { InformationComponent } from './containers/account/information/information.component';
import { SupportDetailComponent } from './containers/account/support-detail/support-detail.component';
import { ScheduleCancelComponent } from './containers/account/schedule-cancel/schedule-cancel.component';
import { VoteComponent } from './containers/account/vote/vote.component';
import { MedicalComponent } from './containers/medical/medical.component';
import { GlobalEventService } from './services/global-event.service';

// SERVICE
import { RestApiService } from './services/rest-api.service';
import { DoctorService } from './services/doctor.service';
import { ClinicService } from './services/clinic.service';
import { BlogService } from './services/blog.service';
import { FormsModule } from '@angular/forms';
import { UrlService } from './services/url.service';
import { DoctorItemComponent } from './components/slide/doctor/doctor-item/doctor-item.component';
import { TestimonialService } from './services/testimonial.service';
import { FaqsService } from './services/faqs.service';
import { FaqItemComponent } from './components/faq-item/faq-item.component';
import { environment } from 'src/environments/environment';
import { PostService } from './services/post.service';
import { NewsDetailComponent } from './containers/news/news-detail/news-detail.component';
import { NewsComponent } from './containers/news/news/news.component';
import { PartnerService } from './services/partner.service';
import { FeedbackService } from './services/feedback.service';
import { DoctorDetailComponent } from './containers/doctor/doctor-detail/doctor-detail.component';
import {PageService} from "./services/page.service";
import {BannerService} from "./services/banner.service";
import { SidebarComponent } from './containers/services/service/sidebar/sidebar.component';
import { ServiceDetailComponent } from './containers/services/service/service-detail/service-detail.component';
import {CategoryService} from "./services/category.service";
import {InsuranceService} from "./services/insurance.service";
import {HighlightService} from "./services/highlight.service";
import { DoctorFilterComponent } from './containers/doctor/doctor-filter/doctor-filter.component';
import {VideoService} from "./services/video.service";

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

    MedicalComponent,

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
    // account
    SettingComponent,
    RegisterComponent,
    LoginComponent,
    SupportComponent,
    ScheduleComponent,
    ScheduleRegisterComponent,
    ScheduleHistoryComponent,
    NotificationComponent,
    InformationComponent,
    SupportDetailComponent,
    ScheduleCancelComponent,
    VoteComponent,
    DoctorItemComponent,
    FaqItemComponent,
    NewsDetailComponent,
    NewsComponent,
    DoctorDetailComponent,
    SidebarComponent,
    ServiceDetailComponent,
    SidebarComponent,
    DoctorFilterComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    HttpClientModule,
    DecodeHtmlEntitiesModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
    }),
    AgmCoreModule.forRoot({
      apiKey: environment.mapApiKey
    }),
    FormsModule,
    NgbModule,
    SlickCarouselModule,
  ],
  providers: [
    GlobalEventService,
    RestApiService,
    DoctorService,
    ClinicService,
    BlogService,
    PostService,
    UrlService,
    TestimonialService,
    FaqsService,
    PartnerService,
    FeedbackService,
    PageService,
    BannerService,
    CategoryService,
    InsuranceService,
    HighlightService,
    VideoService
  ],
  bootstrap: [AppComponent],
  exports: [DecodeHtmlEntitiesModule],
})
export class AppModule {}
