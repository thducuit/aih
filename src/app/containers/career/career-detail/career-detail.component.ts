import {Component, OnInit, OnDestroy} from '@angular/core';
import {Career} from '../../../models/career';
import {ActivatedRoute} from '@angular/router';
import {PostService} from '../../../services/post.service';
import {TranslateService} from '@ngx-translate/core';
import {UrlService} from '../../../services/url.service';
import {forkJoin, Subscription} from 'rxjs';
import {Meta, Title} from '@angular/platform-browser';
import { NgAnimateScrollService } from 'ng-animate-scroll';
import {Page} from '../../../models/page';
import {BannerService} from '../../../services/banner.service';
import { PageService } from '../../../services/page.service';

@Component({
    selector: 'app-career-detail',
    templateUrl: './career-detail.component.html',
    styleUrls: ['./career-detail.component.scss']
})
export class CareerDetailComponent implements OnInit, OnDestroy {
    public career: Career;
    private subscription: Subscription;

    public page: Page;
    public banners: Array<any> = [];

    public slideConfig = {
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        autoplay: false,
        autoplaySpeed: 5000,
        appendDots: '.banner-careers'
    };

    constructor(private route: ActivatedRoute,
                public pageService: PageService,
                public postService: PostService,
                public bannerService: BannerService,
                private translate: TranslateService,
                private animateScrollService: NgAnimateScrollService,
                private metaService: Meta,
                private titleService: Title) {
    }

    ngOnInit() {
        // const alias = this.route.snapshot.paramMap.get('alias');

        this.route.paramMap.subscribe(params => {
            const alias = params.get('alias');
            this.loadPosts(alias);
        });

        this.loadPage();

        this.subscription = this.translate
            .onLangChange
            .subscribe(() => {
                this.loadPage();
                const alias = this.route.snapshot.params.alias;
                this.loadPosts(alias);
            });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    sliderInit(e) {}

    trackBannersFunc(banner) {
        return banner.Url;
    }

    loadPage() {
        forkJoin(
            this.pageService.fetch('careerpage'),
            this.translate.get('american_international_hospital')
        ).subscribe(([data, aihStr]) => {
            const post = data.Post || {};
            const page = new Page(post);
            page.longDesc = UrlService.fixPictureUrl(page.longDesc);
            page.picturePath = UrlService.createPictureUrl(page.picture);
            this.page = page;

            this.bannerService
                .fetch('careerpage', this.page.id)
                .subscribe((bannersResp: any) => {
                    const banners = bannersResp.Banner;
                    this.banners = banners.map(banner => {
                        banner.large = UrlService.createMediaUrl(banner.Url);
                        banner.small = banner.large;
                        banner.url = banner.Link;
                        return banner;
                    });
                });
        });
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
                this.titleService.setTitle(this.career.metaTitle || this.career.name);
                this.career.metaDesc && this.metaService.addTag({name: 'description', content: this.career.metaDesc});
                this.metaService.addTag({name: 'keywords', content: this.career.metaKey});
                setTimeout(() => {
                    this.animateScrollService.scrollToElement('pCareers', 150);
                }, 100);
            });
    }

    scrollToForm() {
        // const el = document.getElementById('careerForm');
        // el.scrollIntoView();
        this.animateScrollService.scrollToElement('careerForm', 150)
    }
}
