import { Component, OnInit } from '@angular/core';
import {Career} from "../../../models/career";
import {ActivatedRoute} from "@angular/router";
import {PostService} from "../../../services/post.service";
import {TranslateService} from "@ngx-translate/core";
import {UrlService} from "../../../services/url.service";

@Component({
  selector: 'app-career-detail',
  templateUrl: './career-detail.component.html',
  styleUrls: ['./career-detail.component.scss']
})
export class CareerDetailComponent implements OnInit {
  public career: Career;
  constructor(
    private route: ActivatedRoute,
    public postService: PostService,
    private translate: TranslateService
  ) { }

  ngOnInit() {
    // const alias = this.route.snapshot.paramMap.get('alias');
    this.route.paramMap.subscribe(params => {
      const alias = params.get('alias');
      this.loadPosts(alias);
    });

    this.translate
      .onLangChange
      .subscribe(() => {
        const alias = this.route.snapshot.params.alias;
        this.loadPosts(alias);
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
        console.log('this.doctor', career);
        this.career = career;
      });
  }
}
