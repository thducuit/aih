import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PostService} from '../../../services/post.service';
import {Blog} from '../../../models/blog';
import {Comment} from '../../../models/comment';
import {UrlService} from '../../../services/url.service';
import {BlogService} from '../../../services/blog.service';
import {TranslateService} from '@ngx-translate/core';
import {Subscription} from 'rxjs';
import {Meta, Title} from '@angular/platform-browser';

import {forkJoin} from 'rxjs';
import Swal from 'sweetalert2';

import {AuthService} from 'angularx-social-login';
import {
    FacebookLoginProvider,
    GoogleLoginProvider,
} from 'angularx-social-login';
import {CommentService} from '../../../services/comment.service';
import {environment} from '../../../../environments/environment.prod';

@Component({
    selector: 'app-news-detail',
    templateUrl: './news-detail.component.html',
    styleUrls: ['./news-detail.component.scss'],
})
export class NewsDetailComponent implements OnInit, OnDestroy {
    public blog: Blog;
    public postNext: Blog;
    public postPrev: Blog;
    public blogs: Array<Blog> = [];
    private subscription: Subscription;

    public keyword;
    public content;

    public comments: Array<Comment> = [];

    public isShowWarning;

    public liked;

    constructor(private route: ActivatedRoute,
                public postService: PostService,
                public blogService: BlogService,
                private translate: TranslateService,
                private metaService: Meta,
                private titleService: Title,
                private router: Router,
                private authService: AuthService,
                public commentService: CommentService) {
    }

    ngOnInit() {
        this.isShowWarning = false;
        // const alias = this.route.snapshot.paramMap.get('alias');
        this.route.paramMap.subscribe(params => {
            this.liked = false;
            const alias = params.get('alias');
            this.loadPosts(alias);
        });
        this.loadFeatureBlogs();
        this.subscription = this.translate.onLangChange.subscribe(() => {
            const alias = this.route.snapshot.params.alias;
            this.loadFeatureBlogs();
            this.postService.getAlias(alias).subscribe((data: any) => {
                const newAlias = data['alias'];
                if (newAlias) {
                    return this.router.navigate([UrlService.createNewsDetailUrl(newAlias)]);
                } else {
                    return this.router.navigate(['/news']);
                }
            });
        });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    private loadPosts(alias: string) {
        forkJoin(
            this.postService.fetch(alias),
            this.translate.get('american_international_hospital'),
        ).subscribe(([data, aihStr]) => {
            const blog = new Blog(data['Post']);
            if (blog.picture) {
                blog.picturePath = UrlService.createPictureUrl(blog.picture);
            }
            blog.longDesc = UrlService.fixPictureUrl(blog.longDesc);
            blog.url = `${location.origin}${UrlService.createNewsDetailUrl(
                blog.alias,
            )}`;

            this.blog = blog;

            const storageLiked = localStorage.getItem('liked');
            const liked = storageLiked ? JSON.parse(storageLiked) : [];
            this.liked = liked.indexOf(blog.id) >= 0;

            // seo
            const pageTitle = this.blog.metaTitle ? `${this.blog.metaTitle} - ${aihStr}` : `${this.blog.name} - ${aihStr}`;
            this.titleService.setTitle(pageTitle);
            this.metaService.updateTag({
                property: 'og:title',
                content: pageTitle,
            });
            this.metaService.updateTag({
                name: 'description',
                content: this.blog.metaDesc,
            });
            this.metaService.updateTag({
                name: 'keywords',
                content: this.blog.metaKey,
            });
            this.metaService.updateTag({
                property: 'og:description',
                content: this.blog.metaDesc,
            });
            this.metaService.updateTag({
                property: 'og:url',
                content: blog.url,
            });
            this.metaService.updateTag({
                property: 'og:image',
                content: blog.picturePath,
            });

            this.commentService
                .comments(this.blog.id, 'news')
                .subscribe((data2: any) => {
                    const comments = data2['Comments'] || [];
                    this.comments = comments.map(comment => {
                        return new Comment(comment);
                    });
                });

            this.postService.fetchNextPrevNews(blog.id).subscribe(data2 => {
                if (data2['PostNext']) {
                    const postNext = new Blog(data2['PostNext']);
                    postNext.url = UrlService.createNewsDetailUrl(postNext.alias);
                    this.postNext = postNext;
                } else {
                    this.postNext = null;
                }
                if (data2['PostPrev']) {
                    const postPrev = new Blog(data2['PostPrev']);
                    postPrev.url = UrlService.createNewsDetailUrl(postPrev.alias);
                    this.postPrev = postPrev;
                } else {
                    this.postPrev = null;
                }
            });
        });
    }

    loadFeatureBlogs() {
        this.blogService.fetchFeature(3).subscribe((data: any) => {
            const posts = data.Posts || [];
            this.blogs = posts.map(post => {
                const blog = new Blog(post);
                blog.picturePath = UrlService.createPictureUrl(blog.picture);
                blog.url = UrlService.createNewsDetailUrl(blog.alias);
                blog.shortDesc = blog.shortDesc.replace(/^(.{2}[^\s]*).*/, '$1');
                return blog;
            });
        });
    }

    gotoSearch() {
        const url = `/search?keyword=${this.keyword}`;
        this.router.navigateByUrl(url).then(e => {
        });
    }

    sendComment() {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user) {
            this.showSocialLogin();
            return;
        }
        if (!this.content) {
            this.openContentAlert();
            return;
        }
        this.commentService
            .comment(user, this.blog.id, 'news', this.content)
            .subscribe((data: any) => {
                if (data['StatusCode'] === 1) {
                    this.openComment(true);
                } else {
                    this.openComment();
                }
                this.content = '';
            });
    }

    vote(isUnlike = false) {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user) {
            this.showSocialLogin();
            return;
        }
        const storageLiked = localStorage.getItem('liked');
        let liked = storageLiked ? JSON.parse(storageLiked) : [];
        if (isUnlike) {
            liked = liked.filter(item => item !== this.blog.id);
            this.liked = false;
        } else {
            liked.push(this.blog.id);
            this.liked = true;
        }
        localStorage.setItem('liked', JSON.stringify(liked));
    }

    openContentAlert() {
        forkJoin(
            this.translate.get('text_comment_alert'),
            this.translate.get('text_close'),
        ).subscribe(([message, buttonText]) => {
            Swal.fire({
                text: message,
                confirmButtonText: buttonText,
            });
        });
    }

    openComment(isSuccess = false) {
        forkJoin(
            this.translate.get('text_comment_success'),
            this.translate.get('text_comment_fail'),
            this.translate.get('text_close'),
            // tslint:disable-next-line:no-shadowed-variable
        ).subscribe(([messageSuccess, messageFail, buttonText]) => {
            Swal.fire({
                text: isSuccess ? messageSuccess : messageFail,
                confirmButtonText: buttonText,
            });
        });
    }

    showSocialLogin() {
        forkJoin(this.translate.get('text_login_social')).subscribe(([message]) => {
            Swal.fire({
                text: message,
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'FACEBOOK',
                cancelButtonText: 'GOOGLE',
            }).then(result => {
                if (result.value) {
                    this.signInWithFB();
                } else {
                    this.signInWithGoogle();
                }
            });
        });
    }

    signInWithGoogle(): void {
        this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(userData => {
            localStorage.setItem('user', JSON.stringify(userData));
        });
    }

    signInWithFB(): void {
        this.authService
            .signIn(FacebookLoginProvider.PROVIDER_ID)
            .then(userData => {
                localStorage.setItem('user', JSON.stringify(userData));
            });
    }

    booking() {
        this.isShowWarning = true;
    }
}
