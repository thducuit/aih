import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PostService} from '../../../services/post.service';
import {Blog} from '../../../models/blog';
import {UrlService} from '../../../services/url.service';
import {BlogService} from '../../../services/blog.service';
import {TranslateService} from '@ngx-translate/core';
import {Subscription} from 'rxjs';
import {Meta, Title} from '@angular/platform-browser';

@Component({
    selector: 'app-news-detail',
    templateUrl: './news-detail.component.html',
    styleUrls: ['./news-detail.component.scss'],
})
export class NewsDetailComponent implements OnInit, OnDestroy {
    public blog: Blog;
    public blogs: Array<Blog> = [];
    private subscription: Subscription;

    constructor(private route: ActivatedRoute,
                public postService: PostService,
                public blogService: BlogService,
                private translate: TranslateService,
                private metaService: Meta,
                private titleService: Title) {
    }

    ngOnInit() {
        // const alias = this.route.snapshot.paramMap.get('alias');
        this.route.paramMap.subscribe(params => {
            const alias = params.get('alias');
            this.loadPosts(alias);
        });
        this.loadFeatureBlogs();
        this.subscription = this.translate
            .onLangChange
            .subscribe(() => {
                const alias = this.route.snapshot.params.alias;
                this.loadFeatureBlogs();
                this.loadPosts(alias);
            });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    private loadPosts(alias: string) {
        this.postService.fetch(alias).subscribe((data: any) => {
            const blog = new Blog(data.Post);
            if (blog.picture) {
                blog.picturePath = UrlService.createPictureUrl(blog.picture);
            }
            blog.longDesc = UrlService.fixPictureUrl(blog.longDesc);
            this.blog = blog;
            // seo
            this.titleService.setTitle(this.blog.metaTitle);
            this.metaService.addTag({name: 'description', content: this.blog.metaDesc});
            this.metaService.addTag({name: 'keywords', content: this.blog.metaKey});
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
}
