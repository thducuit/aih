import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../../../services/blog.service';
import { UrlService } from '../../../../services/url.service';
import { Blog } from '../../../../models/blog';
import { CalculatePagination } from 'src/app/utilities';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-news-item',
  templateUrl: './news-item.component.html',
  styleUrls: ['./news-item.component.scss'],
})
export class NewsItemComponent implements OnInit {
  public blogs: Array<Blog> = [];
  public totalRecord = 0;
  public currentPage = 1;
  public pageNumbers: number[] = [];

  constructor(
    public blogService: BlogService,
    private translate: TranslateService
  ) { }

  ngOnInit() {
    this.loadNews();
    this.translate
    .onLangChange
    .subscribe(() => {
      this.loadNews();
    });
  }

  loadNews() {
    this.blogService.fetch(this.currentPage).subscribe((data: any) => {
      const posts = data.Posts || [];
      this.totalRecord = posts.TotalRecord;
      this.blogs = posts.map(post => {
        const blog = new Blog(post);
        blog.picturePath = UrlService.createPictureUrl(blog.picture);
        blog.url = UrlService.createNewsDetailUrl(blog.alias);
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
