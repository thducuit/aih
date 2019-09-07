import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Video } from '../../../models/video';
import { UrlService } from '../../../services/url.service';
import { VideoService } from '../../../services/video.service';
import { TranslateService } from '@ngx-translate/core';
import { Subscription, forkJoin } from 'rxjs';
import { Title, Meta } from '@angular/platform-browser';
import { VideoComponent as VideoPopupComponent } from './../../../components/popup/video/video.component';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss'],
})
export class VideoComponent implements OnInit, OnDestroy {
  public videos: Array<Video> = [];
  public video: Video;
  private subscription: Subscription;

  public iframeSrc: string;
  @ViewChild('videoPopup', { static: false }) videoPopup: VideoPopupComponent;

  constructor(
    public videoService: VideoService,
    private translate: TranslateService,
    private titleService: Title,
    private metaService: Meta,
  ) {}

  ngOnInit() {
    this.loadVideos();
    this.applyTitle();
    this.subscription = this.translate.onLangChange.subscribe(() => {
      this.applyTitle();
      this.loadVideos();
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  applyTitle() {
    forkJoin(
      this.translate.get('videos'),
      this.translate.get('american_international_hospital'),
    ).subscribe(([videosStr, aihStr]) => {
      const pageTitle = `${videosStr} - ${aihStr}`;
      this.titleService.setTitle(pageTitle);
      this.metaService.updateTag({
        property: 'og:title',
        content: pageTitle,
      });
    });
  }

  loadVideos() {
    this.videoService.fetch().subscribe((data: any) => {
      const posts = data.Media || [];
      const videos = posts.map(post => {
        const video = new Video(post);
        const code = video.file.substring(
          video.file.indexOf('?v=') + 3,
          video.file.length,
        );
        video.thumb = UrlService.createMediaUrl(video.thumb);
        video.iframeUrl = UrlService.createIframeUrl(code);
        return video;
      });
      this.video = videos.find(item => item.hot === '1');
      this.videos = videos.filter(item => {
        if (item.hot === '0') {
          return item;
        }
      });
    });
  }

  openIframeVideo(video) {
    this.iframeSrc = video.iframeUrl;
    this.videoPopup && this.videoPopup.open();
  }
}
