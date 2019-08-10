import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {CareerService} from '../../services/career.service';
import {forkJoin} from 'rxjs';
import Swal from 'sweetalert2';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'app-career-form',
    templateUrl: './career-form.component.html',
    styleUrls: ['./career-form.component.scss']
})
export class CareerFormComponent implements OnInit {

    public form = {
        fullname: '',
        position: '',
        phone: '',
        email: '',
        content: '',
        attach: {}
    };

    public errorFullname = false;
    public errorPosition = false;
    public errorPhone = false;
    public errorEmail = false;

    @ViewChild('uploadFile', {static: false}) uploadFile: ElementRef<HTMLElement>;

    constructor(public careerService: CareerService, private translate: TranslateService) {
    }

    ngOnInit() {
    }

    openSelectFile() {
        const el: HTMLElement = this.uploadFile.nativeElement;
        el.click();
    }

    openSuccess() {
        forkJoin(
            this.translate.get('text_career_form_success'),
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
            this.translate.get('text_career_form_fail'),
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
        this.careerService.apply(this.form).subscribe((data: any) => {
            if (parseInt(data['StatusCode'], 10) === 1) {
                this.openSuccess();
            } else {
                this.openFail();
            }
        });
    }

    validator() {
        let flat = true;
        if (!this.form.fullname) {
            this.errorFullname = true;
            flat = false;
        } else {
            this.errorFullname = false;
        }
        if (!this.form.phone) {
            this.errorPhone = true;
            flat = false;
        } else {
            this.errorPhone = false;
        }
        if (!this.form.position) {
            this.errorPosition = true;
            flat = false;
        } else {
            this.errorPosition = false;
        }
        if (!this.form.email) {
            this.errorEmail = true;
            flat = false;
        } else {
            const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (!re.test(String(this.form.email).toLowerCase())) {
                this.errorEmail = true;
                flat = false;
            } else {
                this.errorEmail = false;
            }
        }
        return flat;
    }


    public processUploadFile(e) {
        if (!e.target || !e.target.files || !e.target.files.length) {
            return;
        }
        const fileReader = new FileReader();
        const file = e.target.files[0];
        if (!this.validateFile(file)) {
            return;
        }
        fileReader.onloadend = () => {
            let binary = '';
            const buffer = fileReader.result;
            const bytes = new Uint8Array(buffer as ArrayBuffer);
            const len = bytes.byteLength;
            for (let i = 0; i < len; i++) {
                binary += String.fromCharCode(bytes[i]);
            }
            const base64 = btoa(binary);
            this.form.attach = {
                contentType: file.type,
                contentAsBase64String: base64,
                fileName: file.name
            };
        };
        fileReader.readAsArrayBuffer(file);
    }

    validateFile(file) {
        const size = file.size / 1024 / 1024;
        const types = [
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'application/msword',
            'application/vnd.ms-excel',
            'application/pdf'
        ];
        if (size > 3) {
            this.openFileAlert(true);
            return false;
        }
        const type = file.type;
        if (types.indexOf(type) === -1) {
            this.openFileAlert();
            return false;
        }
        return true;
    }

    openFileAlert(isAlertSize = false) {
        forkJoin(
            this.translate.get('text_file_size'),
            this.translate.get('text_file_type'),
            this.translate.get('text_close'),
        ).subscribe(([messageSize, messageFile, buttonText]) => {
            Swal.fire({
                text: isAlertSize ? messageSize : messageFile,
                confirmButtonText: buttonText
            });
        });
    }

}
