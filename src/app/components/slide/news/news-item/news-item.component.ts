import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../../../services/blog.service';
import { UrlService } from '../../../../services/url.service';
import { Blog } from '../../../../models/blog';
import { CalculatePagination } from 'src/app/utilities';

@Component({
  selector: 'app-news-item',
  templateUrl: './news-item.component.html',
  styleUrls: ['./news-item.component.scss'],
})
export class NewsItemComponent implements OnInit {
  public blogs: Array<Blog> = [];
  private totalRecord = 0;
  public currentPage = 1;
  public pageNumbers: number[] = [];

  constructor(public blogService: BlogService) {}

  ngOnInit() {
    this.loadNews();
  }

  loadNews() {
    this.blogService.fetch(this.currentPage).subscribe((data: any) => {
      const posts = data.Posts || [];
      this.blogs = posts.map(post => {
        this.totalRecord = post.TotalRecord;
        const blog = new Blog(post);
        blog.picturePath = UrlService.createPictureUrl(blog.picture);
        return blog;
      });
    });
  }

  selectPage(pageNum: number) {
    this.currentPage = pageNum;
    this.recalculatePages();
  }

  private recalculatePages() {
    this.pageNumbers = CalculatePagination(this.currentPage, this.totalRecord || 0);
  }
}
