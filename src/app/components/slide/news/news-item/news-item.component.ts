import {
    Component,
    Input,
    OnInit,
    NgZone,
    OnDestroy,
    ElementRef,
    ViewChild,
    AfterViewInit,
    OnChanges,
    SimpleChanges,
} from '@angular/core';
import {BlogService} from '../../../../services/blog.service';
import {UrlService} from '../../../../services/url.service';
import {Blog} from '../../../../models/blog';
import {CalculatePagination} from 'src/app/utilities';
import {TranslateService} from '@ngx-translate/core';
import {Subscription} from 'rxjs';
import {LoaderService} from '../../../../services/loader-service';

const ItemPerPage = 3;

@Component({
    selector: 'app-news-item',
    templateUrl: './news-item.component.html',
    styleUrls: ['./news-item.component.scss'],
})
export class NewsItemComponent implements OnInit, OnDestroy, AfterViewInit, OnChanges {
    public blogs: Array<Blog> = [];
    public allBlogs: Array<Blog> = [];
    public totalPage = 0;
    public currentPage = 1;
    public pageNumbers: number[] = [];
    private subscription: Subscription;
    public hideReadMore = false;

    public minHeight;

    @Input() showChosenPackage = false;
    @Input() readmore = false;
    @Input() clinic;
    @Input() perPage;

    constructor(public blogService: BlogService,
                private translate: TranslateService,
                private zone: NgZone,
                private loaderService: LoaderService) {
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
      if (this.subscription) {
        this.subscription.unsubscribe();
      }
    }

    loadByClinic(clinic) {
        this.loaderService.show();
        const perPage = this.perPage || ItemPerPage;
        this.blogService.getByClinic(this.currentPage, perPage, clinic.id).subscribe((data2: any) => {
            const posts = data2.Posts || [];
            const perPage = this.perPage || ItemPerPage;
            this.totalPage = Math.ceil(data2.TotalRecord / perPage);
            this.blogs = posts.map(post => {
                const blog = new Blog(post);

                if (blog.meta.picture) {
                    blog.picturePath = UrlService.createPictureUrl(blog.picture, null, null, true);
                } else {
                    blog.picturePath = UrlService.createPictureUrl(blog.picture);
                }

                blog.url = UrlService.createNewsDetailUrl(blog.alias);

                const arr = blog.name.split(' ');
                if (arr.length > 15) {
                    const str = arr.slice(0, 15).join(' ');
                    blog.name = `${str}...`;
                }


                return blog;
            }).sort((obj1, obj2) => (obj1.sort >= obj2.sort ? 1 : -1));
            this.recalculatePages();
            this.loaderService.hide();
        });
    }

    loadNews(isShowAll = false) {
        this.loaderService.show();
        const perPage = this.perPage || ItemPerPage;
        this.blogService
            .fetch(this.currentPage, perPage, ['post_datepublish DESC'], true)
            .subscribe((data: any) => {
                const posts = data.Posts || [];
                const comments = data.Comments || [];

                this.totalPage = Math.ceil(data.TotalRecord / perPage);
                this.blogs = posts.map(post => {
                    const blog = new Blog(post);

                    if (blog.meta.picture) {
                        blog.picturePath = UrlService.createPictureUrl(blog.picture, null, null, true);
                    } else {
                        blog.picturePath = UrlService.createPictureUrl(blog.picture);
                    }

                    blog.url = UrlService.createNewsDetailUrl(blog.alias);
                    blog.comments = comments[blog.id] || 0;

                    const arr = blog.name.split(' ');
                    if (arr.length > 15) {
                        const str = arr.slice(0, 15).join(' ');
                        blog.name = `${str}...`;
                    }

                    this.allBlogs.push(blog);
                    return blog;
                });

                if (isShowAll) {
                    this.blogs = this.allBlogs.reduce((acc, current) => {
                        const x = acc.find(item => item.id === current.id);
                        if (!x) {
                            return acc.concat([current]);
                        } else {
                            return acc;
                        }
                    }, []);
                }
                this.recalculatePages();
                this.loaderService.hide();
            });
    }

    selectPage(pageNum: number) {
        this.currentPage = Math.max(0, Math.min(pageNum, this.totalPage));
        if (this.clinic) {
            this.loadByClinic(this.clinic);
        } else {
            this.loadNews();
        }
    }

    appendNews() {
        this.currentPage += 1;
        if (this.currentPage === this.totalPage) {
            this.hideReadMore = true;
        }
        this.loadNews(true);
    }

    private recalculatePages() {
        this.zone.runOutsideAngular(() => {
            this.pageNumbers = CalculatePagination(this.currentPage, this.totalPage);
        });
    }


    ngAfterViewInit() {
        setTimeout(() => {
            const h = document.getElementById('choosen-wrap-w');
            if (h) {
                this.minHeight = h.offsetHeight;
            }
        }, 100);
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (this.clinic) {
            this.loadByClinic(this.clinic);
        }
    }

}
