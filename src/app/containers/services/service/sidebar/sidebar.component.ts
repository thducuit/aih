import {Component, EventEmitter, OnInit, Output, OnDestroy} from '@angular/core';
import {Clinic} from '../../../../models/clinic';
import {ClinicService} from '../../../../services/clinic.service';
import {UrlService} from '../../../../services/url.service';
import {TranslateService} from '@ngx-translate/core';
import {Subscription} from 'rxjs';
import {LoaderService} from '../../../../services/loader-service';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnDestroy {
    public clinics: Array<Clinic> = [];
    private subscription: Subscription;
    @Output() loadFinish = new EventEmitter<any>();

    constructor(public clinicService: ClinicService,
                private loaderService: LoaderService,
                private translate: TranslateService) {
    }

    ngOnInit() {
        this.loadClinics();
        this.subscription = this.translate
            .onLangChange
            .subscribe(() => {
                this.loadClinics();
            });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    loadClinics() {
        this.loaderService.show();
        this.clinicService.fetch().subscribe((data: {}) => {
            const posts = data['Categories'] || [];
            this.clinics = posts.map(post => {
                const clinic = new Clinic(post);
                clinic.url = UrlService.createClinicDetailUrl(clinic.alias);
                return clinic;
            });
            this.loadFinish.emit(true);
            this.loaderService.hide();
        });
    }

    activeMenu(clinic) {
        this.clinics.map(item => {
            if (item.id === clinic.id) {
                item.active = true;
            } else {
                item.active = false;
            }
            return clinic;
        });
    }

}
