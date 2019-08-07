import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

    public isOpen = false;

    constructor() {
    }

    ngOnInit() {
    }


    open() {
        this.isOpen = true;
    }

    close() {
        this.isOpen = false;
    }
}
