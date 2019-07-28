import { Component, Input, OnInit, NgZone, OnDestroy } from '@angular/core';
import { BlogService } from '../../../../services/blog.service';
import { UrlService } from '../../../../services/url.service';
import { Blog } from '../../../../models/blog';
import { CalculatePagination } from 'src/app/utilities';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

const ItemPerPage = 3;

@Component({
  selector: 'app-news-item',
  templateUrl: './news-item.component.html',
  styleUrls: ['./news-item.component.scss'],
})
export class NewsItemComponent implements OnInit, OnDestroy {
  public blogs: Array<Blog> = [];
  public totalPage = 0;
  public currentPage = 1;
  public pageNumbers: number[] = [];
  private subscription: Subscription;

  @Input() showChosenPackage = false;
  constructor(
    public blogService: BlogService,
    private translate: TranslateService,
    private zone: NgZone
  ) { }

  ngOnInit() {
    this.loadNews();
    this.subscription = this.translate
      .onLangChange
      .subscribe(() => {
        this.loadNews();
      });
  }

  ngOnDestroy () {
    this.subscription.unsubscribe();
  }

  loadNews() {
    this.blogService
      .fetch(this.currentPage, ItemPerPage)
      .subscribe((data: any) => {
        const posts = data.Posts || [];
        this.totalPage = Math.ceil(data.TotalRecord / ItemPerPage);
        this.blogs = posts.map(post => {
          const blog = new Blog(post);
          blog.picturePath = UrlService.createPictureUrl(blog.picture);
          blog.url = UrlService.createNewsDetailUrl(blog.alias);
          return blog;
        });
        this.recalculatePages();
      });
  }

  selectPage(pageNum: number) {
    this.currentPage = Math.max(0, Math.min(pageNum, this.totalPage));
    this.loadNews();
  }

  private recalculatePages() {
    this.zone.runOutsideAngular(() => {
      this.pageNumbers = CalculatePagination(this.currentPage, this.totalPage);
    });
  }
}
