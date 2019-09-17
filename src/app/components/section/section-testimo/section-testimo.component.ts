import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Feedback } from '../../../models/feedback';
import { FeedbackService } from '../../../services/feedback.service';
import { UrlService } from '../../../services/url.service';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { VideoComponent } from '../../popup/video/video.component';

@Component({
  selector: 'app-section-testimo',
  templateUrl: './section-testimo.component.html',
  styleUrls: ['./section-testimo.component.scss'],
})
export class SectionTestimoComponent implements OnInit, OnDestroy {
  public feedback: Feedback;
  public showVideoPopup = false;
  public iframeSrc: string;
  private subscription: Subscription;

  @ViewChild('videoPopup', { static: false }) videoPopup: VideoComponent;

  constructor(
    public feedbackService: FeedbackService,
    private translate: TranslateService,
  ) {}

  ngOnInit() {
    this.loadFeedback();
    this.subscription = this.translate.onLangChange.subscribe(() => {
      this.loadFeedback();
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  loadFeedback() {
    this.feedbackService.fetch().subscribe((data: any) => {
      const post = data.Media[0] || {};
      const feedback = new Feedback(post);
      feedback.thumb = UrlService.createMediaUrl(feedback.thumb);
      feedback.iframeSrc = UrlService.createIframeUrl(feedback.file);
      this.feedback = feedback;
    });
  }

  handleOpenPopup() {
    this.videoPopup.open();
  }

  getLongDesc(feedback: Feedback) {
    const fb = feedback.longdesc.split(' ');
    return fb.slice(0, 28).join(' ') + '....';
  }
}
