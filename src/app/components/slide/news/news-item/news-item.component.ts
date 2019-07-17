import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../../../services/blog.service';
import { UrlService } from '../../../../services/url.service';
import { Blog } from  '../../../../models/blog';

@Component({
  selector: 'app-news-item',
  templateUrl: './news-item.component.html',
  styleUrls: ['./news-item.component.scss']
})
export class NewsItemComponent implements OnInit {

  public blogs: Array<Blog> = [];
  constructor(public blogService: BlogService) { }
  ngOnInit() {
    this.loadNews();
  }

  loadNews() {
    this.blogService.fetch().subscribe((data: {}) => {
      const posts = data['Posts'] || [];
      this.blogs = posts.map( post => {
        const blog = new Blog(post);
        blog.picturePath = UrlService.createPictureUrl(blog.picture);
        return blog;
      });
    });
  }

}
