import { Component, OnInit } from '@angular/core';
import {Video} from "../../../models/video";
import {UrlService} from "../../../services/url.service";
import {VideoService} from "../../../services/video.service";

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit {

  public videos: Array<Video> = [];
  public video: Video;
  constructor(public videoService: VideoService) { }

  ngOnInit() {
    this.loadVideos();
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
