import {Component, OnInit, OnDestroy} from '@angular/core';
import {Blog} from '../../../models/blog';
import {UrlService} from '../../../services/url.service';
import {BlogService} from '../../../services/blog.service';
import {CalculatePagination} from '../../../utilities';
import {TranslateService} from '@ngx-translate/core';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-event',
    templateUrl: './event.component.html',
    styleUrls: ['./event.component.scss']
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

    constructor(public blogService: BlogService,
                private translate: TranslateService) {
    }

    ngOnInit() {
        this.loadNews();
        this.subscription = this.translate
            .onLangChange
            .subscribe(() => {
                this.loadNews();
            });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    loadNews() {
        this.blogService.fetch().subscribe((data: any) => {
            const posts = data.Posts || [];
            this.totalRecord = posts.TotalRecord;
            this.blogs = posts.map(post => {
                const blog = new Blog(post);
                blog.picturePath = UrlService.createPictureUrl(blog.picture);
                blog.url = UrlService.createNewsDetailUrl(blog.alias);
                return blog;
            });
            this.pagination();
            this.calcPages();
        });
    }

    pagination() {
        const start = (this.currentPage - 1) * this.perPage + (this.currentPage - 1);
        this.filterBlogs = this.blogs.slice(start, start + this.perPage);
    }

    calcPages() {
        const pages = Math.floor(this.blogs.length / this.perPage);
        this.pages = Array(pages).fill().map((x, i) => i += 1);
    }

    selectPage(pageNum: number) {
        this.currentPage = pageNum;
        this.recalculatePages();
    }

    private recalculatePages() {
        this.pageNumbers = CalculatePagination(this.currentPage, this.totalRecord || 0);
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
}
