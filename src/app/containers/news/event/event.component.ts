import { Component, OnInit, OnDestroy } from '@angular/core';
import { Blog } from '../../../models/blog';
import { UrlService } from '../../../services/url.service';
import { BlogService } from '../../../services/blog.service';
import { CalculatePagination } from '../../../utilities';
import { TranslateService } from '@ngx-translate/core';
import { Subscription, forkJoin } from 'rxjs';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss'],
})
export class EventComponent implements OnInit, OnDestroy {
  public blogs: Array<Blog> = [];
  public totalRecord = 0;
  public currentPage = 1;
  public perPage = 7;
  public filterBlogs = [];
  public pages = [];

  public pageNumbers: number[] = [];
  private subscription: Subscription;

  constructor(
    public blogService: BlogService,
    private translate: TranslateService,
    private titleService: Title
  ) { }

  ngOnInit() {
    this.loadNews();
    this.subscription = this.translate.onLangChange.subscribe(() => {
      this.loadNews();
    });
    forkJoin(
      this.translate.get('news'),
      this.translate.get('american_international_hospital')
    ).subscribe(([newsStr, aihStr]) => {
      this.titleService.setTitle(`${newsStr} - ${aihStr}`);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  loadNews() {
    this.blogService
      .fetch(1, 999)
      .subscribe((data: any) => {
        const posts = data.Posts || [];
        this.totalRecord = posts.TotalRecord;
        const convertedBlogs: any[] = posts.map(post => {
          const blog = new Blog(post);
          blog.picturePath = UrlService.createPictureUrl(blog.picture);
          blog.url = UrlService.createNewsDetailUrl(blog.alias);
          return blog;
        });
        this.blogs = convertedBlogs;
        this.pagination();
        this.calcPages();
      });
  }

  pagination() {
    const start =
      (this.currentPage - 1) * this.perPage + (this.currentPage - 1);
    this.filterBlogs = this.blogs.slice(start, start + this.perPage);
  }

  calcPages() {
    const pages = Math.floor(this.blogs.length / this.perPage);
    this.pages = [];
    for (let i = 1; i <= pages; i++) {
      this.pages.push(i);
    }
  }

  selectPage(pageNum: number) {
    this.currentPage = pageNum;
    this.recalculatePages();
  }

  private recalculatePages() {
    this.pageNumbers = CalculatePagination(
      this.currentPage,
      this.totalRecord || 0,
    );
  }

  changePage(page) {
    this.currentPage = page;
    this.pagination();
  }

  prev() {
    this.currentPage -= 1;
    this.pagination();
  }

  next() {
    this.currentPage += 1;
    this.pagination();
  }

  truncateText(str: string, length: number) {
    if (!str || str.length < length) {
      return str;
    }
    return str.substr(0, length - 3).trim() + '...';
  }
}
