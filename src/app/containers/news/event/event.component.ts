import { Component, OnInit } from '@angular/core';
import { Blog } from '../../../models/blog';
import { UrlService } from '../../../services/url.service';
import { BlogService } from '../../../services/blog.service';
import { CalculatePagination } from '../../../utilities';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {

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
    this.blogService.fetch(this.currentPage, 7).subscribe((data: any) => {
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
