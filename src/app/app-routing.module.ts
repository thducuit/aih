import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {HomeComponent} from './containers/home/home.component';
import {AboutComponent} from './containers/abouts/about/about.component';

import {PageLayoutComponent} from './layouts/page-layout/page-layout.component';
import {QaComponent} from './containers/abouts/qa/qa.component';
import {TestimonialComponent} from './containers/abouts/testimonial/testimonial.component';
import {ServiceComponent} from './containers/services/service/service.component';
import {InsuranceComponent} from './containers/services/insurance/insurance.component';
import {FactsheetComponent} from './containers/services/factsheet/factsheet.component';
import {DoctorComponent} from './containers/doctor/doctor.component';
import {VideoComponent} from './containers/news/video/video.component';
import {EventComponent} from './containers/news/event/event.component';
import {CareerComponent} from './containers/career/career.component';
import {ContactComponent} from './containers/contact/contact.component';
import {MedicalComponent} from './containers/medical/medical.component';
import {SearchComponent} from './containers/search/search.component';

// account
import {SettingComponent} from './containers/account/setting/setting.component';
import {InformationComponent} from './containers/account/information/information.component';
import {VoteComponent} from './containers/account/vote/vote.component';
import {ScheduleHistoryComponent} from './containers/account/schedule-history/schedule-history.component';
import {ScheduleComponent} from './containers/account/schedule/schedule.component';
import {ScheduleCancelComponent} from './containers/account/schedule-cancel/schedule-cancel.component';
import {ScheduleRegisterComponent} from './containers/account/schedule-register/schedule-register.component';
import {LoginComponent} from './containers/account/login/login.component';
import {RegisterComponent} from './containers/account/register/register.component';
import {NewsDetailComponent} from './containers/news/news-detail/news-detail.component';
import {DoctorDetailComponent} from './containers/doctor/doctor-detail/doctor-detail.component';
import {ServiceDetailComponent} from './containers/services/service/service-detail/service-detail.component';
import {CareerDetailComponent} from './containers/career/career-detail/career-detail.component';
import {InsuranceMembershipComponent} from './containers/insurance/insurance-membership/insurance-membership.component';
import {InsuranceConsultingComponent} from './containers/insurance/insurance-consulting/insurance-consulting.component';
import {InsuranceDetailComponent} from './containers/insurance/insurance-detail/insurance-detail.component';
import {MembershipConsultingComponent} from './containers/insurance/membership-consulting/membership-consulting.component';
import {MembershipComponent} from './containers/insurance/membership/membership.component';
import {NotFoundComponent} from './containers/not-found/not-found.component';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        pathMatch: 'full',
    },
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
                path: ':alias',
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
                path: ':alias',
                component: NewsDetailComponent,
            },
            {
                path: '',
                component: EventComponent,
            },
        ],
    },
    {
        path: 'video',
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
                path: ':alias',
                component: CareerDetailComponent,
            },
            {path: '', component: CareerComponent},
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
        path: 'insurance-services',
        component: PageLayoutComponent,
        children: [
            {
                path: '',
                component: InsuranceMembershipComponent,
            }
        ],
    },
    {
        path: 'insurance-and-customer-services',
        component: PageLayoutComponent,
        children: [
            {
                path: ':id',
                component: InsuranceConsultingComponent,
            },
            {
                path: ':id/:alias',
                component: InsuranceDetailComponent,
            }
        ],
    },
    // VN
    {
        path: 'gioi-thieu',
        component: PageLayoutComponent,
        children: [
            {
                path: 'benh-vien-aih',
                component: AboutComponent,
            },
            {
                path: 'hoi-dap',
                component: QaComponent,
            },
            {
                path: 'y-kien-khach-hang',
                component: TestimonialComponent,
            },
        ],
    },
    {
        path: 'dich-vu-y-khoa',
        component: PageLayoutComponent,
        children: [
            {
                path: 'chuyen-khoa',
                component: ServiceComponent,
            },
            {
                path: 'chuyen-khoa/:alias',
                component: ServiceDetailComponent,
            },
            {
                path: 'goi-dich-vu',
                component: MedicalComponent,
            },
            {
                path: 'bao-hiem',
                component: InsuranceComponent,
            },
            {
                path: 'thong-tin-noi-bat',
                component: FactsheetComponent,
            },
        ],
    },
    {
        path: 'bac-sy',
        component: PageLayoutComponent,
        children: [
            {
                path: ':alias',
                component: DoctorDetailComponent,
            },
            {
                path: '',
                component: DoctorComponent,
            },
        ],
    },
    {
        path: 'tin-tuc',
        component: PageLayoutComponent,
        children: [
            {
                path: ':alias',
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
        path: 'tuyen-dung',
        component: PageLayoutComponent,
        children: [
            {
                path: ':alias',
                component: CareerDetailComponent,
            },
            {path: '', component: CareerComponent},
        ],
    },
    {
        path: 'lien-he',
        component: PageLayoutComponent,
        children: [
            {
                path: '',
                component: ContactComponent,
            },
        ],
    },
    {
        path: 'tim-kiem',
        component: PageLayoutComponent,
        children: [
            {
                path: '',
                component: SearchComponent,
            },
        ],
    },
    {
        path: 'dich-vu-bao-hiem',
        component: PageLayoutComponent,
        children: [
            {
                path: '',
                component: InsuranceMembershipComponent,
            }
        ],
    },
    {
        path: 'dich-vu-khach-hang-va-bao-hiem',
        component: PageLayoutComponent,
        children: [
            {
                path: ':id',
                component: InsuranceConsultingComponent,
            },
            {
                path: ':id/:alias',
                component: InsuranceDetailComponent,
            }
            // {
            //     path: 'tu-van-thanh-vien/:id',
            //     component: MembershipConsultingComponent,
            // },
            // {
            //     path: 'thanh-vien/:alias',
            //     component: MembershipComponent
            // }
        ],
    },
    {
        path: '**',
        component: NotFoundComponent,
    }
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
export class AppRoutingModule {
}
