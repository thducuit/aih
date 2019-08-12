import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
    selector: 'app-search-form',
    templateUrl: './search-form.component.html',
    styleUrls: ['./search-form.component.scss']
})
export class SearchFormComponent implements OnInit {

    public isOpen = false;
    public keyword;

    constructor(private router: Router) {
    }

    ngOnInit() {
    }


    open() {
        this.isOpen = true;
    }

    close() {
        this.isOpen = false;
    }

    gotoSearch() {
        const url = `/search?keyword=${this.keyword}`;
        this.router.navigateByUrl(url).then(e => {
        });
        this.isOpen = false;
    }
}
