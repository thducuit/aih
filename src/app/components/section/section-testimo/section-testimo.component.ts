import {Component, OnInit, OnDestroy, ViewChild} from '@angular/core';
import {Feedback} from '../../../models/feedback';
import {FeedbackService} from '../../../services/feedback.service';
import {UrlService} from '../../../services/url.service';
import {TranslateService} from '@ngx-translate/core';
import {Subscription} from 'rxjs';
import {VideoComponent} from '../../popup/video/video.component';
import {Testimonial} from '../../../models/testimonial';

@Component({
    selector: 'app-section-testimo',
    templateUrl: './section-testimo.component.html',
    styleUrls: ['./section-testimo.component.scss'],
})
export class SectionTestimoComponent implements OnInit, OnDestroy {
    public feedback: Feedback;
    public showVideoPopup = false;
    public iframeSrc: string;
    showTestimo = false;
    private subscription: Subscription;

    slideConfig = {
        slideToShow: 1,
        // infinite: false,
        arrows: false
        // autoplay: true,
        // autoplaySpeed: 5000,
    };

    public feedbacks: any[];

    @ViewChild('videoPopup', {static: false}) videoPopup: VideoComponent;

    constructor(public feedbackService: FeedbackService,
                private translate: TranslateService,
                private urlService: UrlService
    ) {
    }

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
            this.feedbacks = (data.Media || [])
                .map((x: any) => {
                    return new Feedback(x);
                })
                .map((feedback: any) => {
                    feedback.thumb = feedback.thumb ? UrlService.createMediaUrl(feedback.thumb) : '';
                    feedback.iframeSrc = feedback.file ? UrlService.createIframeUrl(feedback.file) : '';
                    return feedback;
                });

            this.iframeSrc = this.feedbacks[0] ? this.feedbacks[0].iframeSrc : '';
        });
    }

    handleOpenPopup() {
        this.videoPopup.open();
    }

    getLongDesc(feedback: Feedback) {
        const fb = feedback.longdesc.split(' ');
        return fb.slice(0, 28).join(' ') + '....';
    }


    slickInit(e) {
    }

    onBeforeChange(e) {
    }

    onAfterChange(e) {
        this.iframeSrc = this.feedbacks[e.currentSlide] ? this.feedbacks[e.currentSlide].iframeSrc : '';
    }

}
