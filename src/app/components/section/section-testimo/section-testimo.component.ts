import { Component, OnInit, OnDestroy } from '@angular/core';
import { Feedback } from '../../../models/feedback';
import { FeedbackService } from '../../../services/feedback.service';
import { UrlService } from '../../../services/url.service';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-section-testimo',
  templateUrl: './section-testimo.component.html',
  styleUrls: ['./section-testimo.component.scss']
})
export class SectionTestimoComponent implements OnInit, OnDestroy {
  public feedback: Feedback;
  public showVideoPopup = false;
  public iframeSrc: string;
  private subscription: Subscription;
  constructor(
    public feedbackService: FeedbackService,
    private translate: TranslateService
  ) { }

  ngOnInit() {
    this.loadFeedback();
    this.subscription = this.translate
      .onLangChange
      .subscribe(() => {
        this.loadFeedback();
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  loadFeedback() {
    this.feedbackService.fetch().subscribe((data: any) => {
      const post = data.Media[0] || {};
      const feedback = new Feedback(post);
      console.log('feedback', feedback);
      feedback.thumb = UrlService.createMediaUrl(feedback.thumb);
      this.iframeSrc = UrlService.createIframeUrl(feedback.file);
      this.feedback = feedback;
    });
  }

  handleOpenPopup() {
    this.showVideoPopup = true;
  }

  handleClosePopup() {
    this.showVideoPopup = false;
  }

}
