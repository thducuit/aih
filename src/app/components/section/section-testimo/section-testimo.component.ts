import { Component, OnInit } from '@angular/core';
import { Feedback } from '../../../models/feedback';
import { FeedbackService } from '../../../services/feedback.service';
import { UrlService } from '../../../services/url.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-section-testimo',
  templateUrl: './section-testimo.component.html',
  styleUrls: ['./section-testimo.component.scss']
})
export class SectionTestimoComponent implements OnInit {

  public feedback: Feedback;
  constructor(
    public feedbackService: FeedbackService,
    private translate: TranslateService
  ) { }

  ngOnInit() {
    this.loadFeedback();
    this.translate
      .onLangChange
      .subscribe(() => {
        this.loadFeedback();
      });
  }

  loadFeedback() {
    this.feedbackService.fetch().subscribe((data: any) => {
      const post = data.Media[0] || {};
      const feedback = new Feedback(post);
      feedback.thumb = UrlService.createMediaUrl(feedback.thumb);
      this.feedback = feedback;
    });
  }

}
