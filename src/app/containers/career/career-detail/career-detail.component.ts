import {Component, OnInit, OnDestroy} from '@angular/core';
import {Career} from '../../../models/career';
import {ActivatedRoute} from '@angular/router';
import {PostService} from '../../../services/post.service';
import {TranslateService} from '@ngx-translate/core';
import {UrlService} from '../../../services/url.service';
import {Subscription} from 'rxjs';
import {Meta, Title} from '@angular/platform-browser';

@Component({
    selector: 'app-career-detail',
    templateUrl: './career-detail.component.html',
    styleUrls: ['./career-detail.component.scss']
})
export class CareerDetailComponent implements OnInit, OnDestroy {
    public career: Career;
    private subscription: Subscription;

    constructor(private route: ActivatedRoute,
                public postService: PostService,
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

        this.subscription = this.translate
            .onLangChange
            .subscribe(() => {
                const alias = this.route.snapshot.params.alias;
                this.loadPosts(alias);
            });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    private loadPosts(alias) {
        this.postService
            .fetch(alias)
            .subscribe((data: any) => {
                const career = new Career(data.Post);
                if (career.picture) {
                    career.picturePath = UrlService.createPictureUrl(career.picture);
                }
                career.longDesc = UrlService.fixPictureUrl(career.longDesc);
                this.career = career;
                // seo
                this.titleService.setTitle(this.career.metaTitle);
                this.metaService.addTag({name: 'description', content: this.career.metaDesc});
                this.metaService.addTag({name: 'keywords', content: this.career.metaKey});
            });
    }
}
