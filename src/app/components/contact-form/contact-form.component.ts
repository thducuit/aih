import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { ContactService } from '../../services/contact.service';
import { forkJoin } from 'rxjs';
import Swal from 'sweetalert2';
import { TranslateService } from '@ngx-translate/core';
import { RecaptchaComponent } from 'ng-recaptcha';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss'],
})
export class ContactFormComponent implements OnInit, OnDestroy {
  public form = {
    fullname: '',
    email: '',
    content: '',
  };

  @ViewChild('recaptcha', { static: true }) recaptcha: RecaptchaComponent;
  public errorFullname = false;
  public errorEmail = false;

  public captchaResponse;
  public recaptchaSiteKey = environment.recaptchaSiteKey;

  constructor(
    public contactService: ContactService,
    private translate: TranslateService,
  ) {}

  ngOnInit() {
    this.reset();
  }

  ngOnDestroy() {
    const captchaElem = this.recaptcha['elementRef'].nativeElement;
    captchaElem.parentElement.removeChild(captchaElem);
  }

  reset() {
    this.captchaResponse = null;
    this.form = {
      fullname: '',
      email: '',
      content: '',
    };
    this.recaptcha && this.recaptcha.reset();
  }

  openSuccess() {
    forkJoin(
      this.translate.get('text_contact_form_success'),
      this.translate.get('text_close'),
    ).subscribe(([message, buttonText]) => {
      Swal.fire({
        text: message,
        confirmButtonText: buttonText,
      });
      this.reset();
    });
  }

  openFail() {
    forkJoin(
      this.translate.get('text_contact_form_fail'),
      this.translate.get('text_close'),
    ).subscribe(([message, buttonText]) => {
      Swal.fire({
        text: message,
        confirmButtonText: buttonText,
      });
      this.reset();
    });
  }

  submitForm() {
    if (!this.validator()) {
      return;
    }
    if (!this.captchaResponse) {
      this.openCaptchaFail();
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
    let flag = true;
    if (!this.form.fullname) {
      this.errorFullname = true;
      flag = false;
    } else {
      this.errorFullname = false;
    }
    if (!this.form.email) {
      this.errorEmail = true;
      flag = false;
    } else {
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!re.test(String(this.form.email).toLowerCase())) {
        this.errorEmail = true;
        flag = false;
      } else {
        this.errorEmail = false;
      }
    }
    return flag;
  }

  openCaptchaFail() {
    forkJoin(
      this.translate.get('text_career_form__captcha_fail'),
      this.translate.get('text_close'),
    ).subscribe(([message, buttonText]) => {
      Swal.fire({
        text: message,
        confirmButtonText: buttonText,
      });
    });
  }

  resolved(captchaResponse: string) {
    this.captchaResponse = captchaResponse;
  }
}
