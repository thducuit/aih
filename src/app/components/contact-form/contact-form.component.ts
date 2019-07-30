import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {ContactService} from '../../services/contact.service';
import {forkJoin} from 'rxjs';
import Swal from 'sweetalert2';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'app-contact-form',
    templateUrl: './contact-form.component.html',
    styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnInit {

    public form = {
        fullname: '',
        email: '',
        content: '',
    };

    public errorFullname = false;
    public errorEmail = false;

    constructor(public contactService: ContactService, private translate: TranslateService) {
    }

    ngOnInit() {
    }

    openSuccess() {
        forkJoin(
            this.translate.get('text_contact_form_success'),
            this.translate.get('text_close'),
        ).subscribe(([message, buttonText]) => {
            Swal.fire({
                text: message,
                confirmButtonText: buttonText
            });
        });
    }

    openFail() {
        forkJoin(
            this.translate.get('text_contact_form_fail'),
            this.translate.get('text_close'),
        ).subscribe(([message, buttonText]) => {
            Swal.fire({
                text: message,
                confirmButtonText: buttonText
            });
        });
    }

    submitForm() {
        if (!this.validator()) {
            return;
        }
        this.contactService.apply(this.form).subscribe((data: any) => {
            if (parseInt(data['StatusCode'], 10) === 1) {
                this.openSuccess();
            } else {
                this.openFail();
            }
        });
    }

    validator() {
        if (!this.form.fullname) {
            this.errorFullname = true;
            return false;
        } else {
            this.errorFullname = false;
        }
        if (!this.form.email) {
            this.errorEmail = true;
            return false;
        } else {
            const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (!re.test(String(this.form.email).toLowerCase())) {
                this.errorEmail = true;
                return false;
            } else {
                this.errorEmail = false;
            }
        }
        return true;
    }

}
