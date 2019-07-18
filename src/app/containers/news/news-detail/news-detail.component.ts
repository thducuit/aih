import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../../../services/post.service';
import { Blog } from '../../../models/blog';
import { UrlService } from '../../../services/url.service';
import {BlogService} from "../../../services/blog.service";

@Component({
  selector: 'app-news-detail',
  templateUrl: './news-detail.component.html',
  styleUrls: ['./news-detail.component.scss'],
})
export class NewsDetailComponent implements OnInit {
  public blog: Blog;
  public blogs: Array<Blog> = [];
  constructor(private route: ActivatedRoute,
              public postService: PostService,
              public blogService: BlogService) {}

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
        this.blog = blog;
      });
    });
    this.loadFeatureBlogs();
  }

  loadFeatureBlogs() {
    this.blogService.fetchFeature(3).subscribe( (data: any) => {
      const posts = data.Posts || [];
      this.blogs = posts.map(post => {
        const blog = new Blog(post);
        blog.picturePath = UrlService.createPictureUrl(blog.picture);
        blog.url = UrlService.createNewsDetailUrl(blog.alias);
        blog.shortDesc = blog.shortDesc.replace(/^(.{2}[^\s]*).*/, '$1');
        return blog;
      });
    });
  }
}
