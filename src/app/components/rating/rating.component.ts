import {Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
    selector: 'app-rating',
    templateUrl: './rating.component.html',
    styleUrls: ['./rating.component.scss']
})
export class RatingComponent implements OnInit, OnChanges {

    public stars = [
        {
            label: 'Poor',
            point: 1,
            isHover: false,
            isChosen: false,
        },
        {
            label: 'Fair',
            point: 2,
            isHover: false,
            isChosen: false,
        },
        {
            label: 'Good',
            point: 3,
            isHover: false,
            isChosen: false,
        },
        {
            label: 'Excellent',
            point: 4,
            isHover: false,
            isChosen: false,
        },
        {
            label: 'WOW!!!',
            point: 5,
            isHover: false,
            isChosen: false,
        }
    ];

    @Output() takePoint = new EventEmitter<any>();
    @Input() isReset;

    constructor(public sanitizer: DomSanitizer) {
    }

    ngOnInit() {
    }

    handleHover(item) {
        this.stars = this.stars.map(star => {
            if (star.point <= item.point) {
                star.isHover = true;
            } else {
                star.isHover = false;
            }
            return star;
        });
    }

    handleChosen(item) {
        this.stars = this.stars.map(star => {
            if (star.point <= item.point) {
                star.isChosen = true;
            } else {
                star.isChosen = false;
            }
            return star;
        });
        this.takePoint.emit(item.point);
    }

    handleLeave() {
        this.stars = this.stars.map(star => {
            star.isHover = false;
            return star;
        });
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (this.isReset) {
            this.stars = this.stars.map(star => {
                star.isHover = false;
                star.isChosen = false;
                return star;
            });
        }
    }

}
