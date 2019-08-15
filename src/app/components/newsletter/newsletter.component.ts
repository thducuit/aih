import {Component, OnInit} from '@angular/core';
import {forkJoin} from 'rxjs';
import {ContactService} from '../../services/contact.service';
import {TranslateService} from '@ngx-translate/core';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-newsletter',
    templateUrl: './newsletter.component.html',
    styleUrls: ['./newsletter.component.scss']
})
export class NewsletterComponent implements OnInit {

    public email;
    public errorEmail;

    constructor(public contactService: ContactService, private translate: TranslateService) {
    }

    ngOnInit() {
        this.errorEmail = false;
    }

    openSuccess() {
        forkJoin(
            this.translate.get('text_subsribe_form_success'),
            this.translate.get('text_close'),
        ).subscribe(([message, buttonText]) => {
            Swal.fire({
                text: message,
                confirmButtonText: buttonText
            });
            this.email = '';
        });
    }

    openFail() {
        forkJoin(
            this.translate.get('text_subsribe_form_fail'),
            this.translate.get('text_close'),
        ).subscribe(([message, buttonText]) => {
            Swal.fire({
                text: message,
                confirmButtonText: buttonText
            });
        });
    }


    validator() {
        let flag = true;
        if (!this.email) {
            this.errorEmail = true;
            flag = false;
        } else {
            const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (!re.test(String(this.email).toLowerCase())) {
                this.errorEmail = true;
                flag = false;
            } else {
                this.errorEmail = false;
            }
        }
        return flag;
    }

    subsribe() {
        if (!this.validator()) {
            return;
        }
        this.contactService.subsribe(this.email).subscribe((data: any) => {
            if (parseInt(data['StatusCode'], 10) === 1) {
                this.openSuccess();
            } else {
                this.openFail();
            }
        });
    }

}
