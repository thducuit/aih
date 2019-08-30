import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnDestroy,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { debounce, debounceTime } from 'rxjs/operators';
import { timer, Subject } from 'rxjs';

@Component({
  selector: 'app-video-popup',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss'],
})
export class VideoComponent implements OnDestroy {
  @Input() iframeSrc: string;
  @Output() closePopup = new EventEmitter<any>();

  isShowPopup = false;
  private changeSubject = new Subject();
  private changeSubscription = this.changeSubject
    .pipe(debounceTime(1000))
    .subscribe((val: boolean) => {
      this.isShowPopup = val;
      this.closePopup.emit(val);
    });

  constructor(public sanitizer: DomSanitizer) {}

  ngOnDestroy() {
    this.changeSubscription.unsubscribe();
  }

  open() {
    this.changeSubject.next(true);
  }

  close() {
    this.changeSubject.next(false);
  }
}
