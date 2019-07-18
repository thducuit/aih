import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../../../services/post.service';
import { Blog } from '../../../models/blog';
import { UrlService } from '../../../services/url.service';

@Component({
  selector: 'app-news-detail',
  templateUrl: './news-detail.component.html',
  styleUrls: ['./news-detail.component.scss'],
})
export class NewsDetailComponent implements OnInit {
  public blog: Blog;
  constructor(private route: ActivatedRoute, public postService: PostService) {}

  ngOnInit() {
    // const alias = this.route.snapshot.paramMap.get('alias');
    this.route.paramMap.subscribe(params => {
      const alias = params.get('alias');
      this.postService.fetch(alias).subscribe((data: any) => {
        const blog = new Blog(data.Post);
        if (blog.picture) {
          blog.picturePath = UrlService.createPictureUrl(blog.picture);
        }
        blog.longDesc = UrlService.fixPictureUrl(blog.longDesc);
        console.log(blog, data.Post);
        this.blog = blog;
      });
    });
  }
}
