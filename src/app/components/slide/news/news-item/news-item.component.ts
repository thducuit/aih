import {Component, Input, OnInit, NgZone, OnDestroy, ElementRef, ViewChild, AfterViewInit} from '@angular/core';
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
export class NewsItemComponent implements OnInit, OnDestroy, AfterViewInit {
    public blogs: Array<Blog> = [];
    public totalPage = 0;
    public currentPage = 1;
    public pageNumbers: number[] = [];
    private subscription: Subscription;

    public minHeight;

    @Input() showChosenPackage = false;

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
        this.subscription.unsubscribe();
    }

    loadNews() {
        this.loaderService.show();
        this.blogService
            .fetch(this.currentPage, ItemPerPage, [], true)
            .subscribe((data: any) => {
                const posts = data.Posts || [];
                this.totalPage = Math.ceil(data.TotalRecord / ItemPerPage);
                this.blogs = posts.map(post => {
                    const blog = new Blog(post);

                    if (blog.meta.picture) {
                        blog.picturePath = UrlService.createPictureUrl(blog.picture, null, null, true);
                    } else {
                        blog.picturePath = UrlService.createPictureUrl(blog.picture);
                    }

                    blog.url = UrlService.createNewsDetailUrl(blog.alias);

                    if (blog.name.length > 50) {
                        const arr = blog.name.split(' ');
                        const str = arr.slice(1, 10).join(' ');
                        blog.name = `${str}...`;
                    }


                    return blog;
                }).sort((obj1, obj2) => (obj1.sort >= obj2.sort ? 1 : -1));
                this.recalculatePages();
                this.loaderService.hide();
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


    ngAfterViewInit() {
        setTimeout(() => {
            const h = document.getElementById('choosen-wrap-w');
            if (h) {
                this.minHeight = h.offsetHeight;
            }
        }, 100);
    }

}
