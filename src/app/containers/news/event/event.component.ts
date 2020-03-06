import { Component, OnInit, OnDestroy, ViewChild, Inject, PLATFORM_ID } from '@angular/core';
import {Blog} from '../../../models/blog';
import {UrlService} from '../../../services/url.service';
import {BlogService} from '../../../services/blog.service';
import {CalculatePagination} from '../../../utilities';
import {TranslateService} from '@ngx-translate/core';
import {Subscription, forkJoin} from 'rxjs';
import {Title, Meta} from '@angular/platform-browser';
import {LoaderService} from '../../../services/loader-service';
import {VideoComponent} from 'src/app/components/popup/video/video.component';
import {NgAnimateScrollService} from 'ng-animate-scroll';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';

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

    @ViewChild('videoPopup', {static: false}) videoPopup: VideoComponent;

    public iframeSrc;

    constructor(@Inject(DOCUMENT) private document,
                @Inject(PLATFORM_ID) private platformId,
                public blogService: BlogService,
                private translate: TranslateService,
                private loaderService: LoaderService,
                private titleService: Title,
                private metaService: Meta,
                private animateScrollService: NgAnimateScrollService) {
    }

    ngOnInit() {
        this.loadNews();
        this.subscription = this.translate.onLangChange.subscribe(() => {
            this.loadNews();
            this.applyTitle();
        });
        this.applyTitle();
    }

    private applyTitle() {
        forkJoin(
            this.translate.get('news'),
            this.translate.get('american_international_hospital'),
        ).subscribe(([newsStr, aihStr]) => {
            const pageTitle = `${newsStr} - ${aihStr}`;
            this.titleService.setTitle(pageTitle);
            this.metaService.updateTag({
                property: 'og:title',
                content: pageTitle,
            });
        });
    }

    ngOnDestroy() {
        if (this.subscription) {
          this.subscription.unsubscribe();
        }
    }

    loadNews() {
        this.loaderService.show();
        if (isPlatformBrowser(this.platformId)) {
          window.scroll(0, 0);
        }
        this.blogService
            .fetch(1, 999, ['post_ishot DESC', 'post_datepublish DESC'])
            .subscribe((data: any) => {
                const posts = data.Posts || [];
                this.totalRecord = posts.TotalRecord;
                const convertedBlogs: any[] = posts
                    .map(post => {
                        const blog = new Blog(post);
                        if (blog.meta.picture) {
                            blog.picturePath = UrlService.createPictureUrl(
                                blog.picture,
                                null,
                                null,
                                true,
                            );
                        } else {
                            blog.picturePath = UrlService.createPictureUrl(blog.picture);
                        }

                        blog.url = UrlService.createNewsDetailUrl(blog.alias);
                        const {video} = blog.meta;
                        if (video) {
                            const code = video.substring(
                                video.indexOf('?v=') + 3,
                                video.length,
                            );
                            blog.iframeUrl = UrlService.createIframeUrl(code);
                        }
                        return blog;
                    });

                this.blogs = convertedBlogs;

                this.pagination();
                this.calcPages();
                this.loaderService.hide();
            });
    }

    pagination() {
        const start =
            (this.currentPage - 1) * this.perPage;
        this.filterBlogs = this.blogs.slice(start, start + this.perPage);
    }

    calcPages() {
        const pages = Math.ceil(this.blogs.length / this.perPage);
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
        const arr = str.split(' ');
        if (!arr || arr.length < length) {
            return str;
        }
        return arr.slice(0, length).join(' ').trim() + '...';
    }

    openIframeVideo(video) {
        this.iframeSrc = video.iframeUrl;
        this.videoPopup.open();
    }
}
