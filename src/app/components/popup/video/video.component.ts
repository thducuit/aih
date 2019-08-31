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
export class VideoComponent {
  @Input() iframeSrc: string;
  @Output() closePopup = new EventEmitter<any>();

  isShowPopup = false;
  constructor() {}

  open() {
    this.isShowPopup = true;
  }

  close() {
    this.isShowPopup = false;
  }
}
