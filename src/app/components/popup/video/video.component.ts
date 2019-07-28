import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-video-popup',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit {

  @Input() iframeSrc: string;
  @Input() isShowPopup = false;
  @Output() closePopup = new EventEmitter<any>();
  constructor(public sanitizer: DomSanitizer) { }

  ngOnInit() {
  }

  handleClose() {
    this.closePopup.emit();
  }
}
