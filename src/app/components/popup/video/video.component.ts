import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-video-popup',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent {

  @Input() iframeSrc: string;
  @Output() closePopup = new EventEmitter<any>();

  isShowPopup = false;
  constructor(public sanitizer: DomSanitizer) { }

  open() {
    this.isShowPopup = true;
  }

  close() {
    this.isShowPopup = false;
    this.closePopup.emit();
  }
}
