import { Component, OnInit, OnDestroy } from '@angular/core';
import { Video } from '../../../models/video';
import { UrlService } from '../../../services/url.service';
import { VideoService } from '../../../services/video.service';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit, OnDestroy {
  public videos: Array<Video> = [];
  public video: Video;
  private subscription: Subscription;

  constructor(
    public videoService: VideoService,
    private translate: TranslateService
  ) { }

  ngOnInit() {
    this.loadVideos();
    this.subscription = this.translate
      .onLangChange
      .subscribe(() => {
        this.loadVideos();
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  loadVideos() {
    this.videoService.fetch().subscribe((data: any) => {
      const posts = data.Media || [];
      const videos = posts.map(post => {
        const video = new Video(post);
        video.thumb = UrlService.createMediaUrl(video.thumb);
        return video;
      });
      this.video = videos.find(item => item.hot === '1');
      this.videos = videos.filter(item => {
        if (item.hot === '0') {
          return item;
        }
      });
      console.log('this.videos', videos);
    });
  }

}
