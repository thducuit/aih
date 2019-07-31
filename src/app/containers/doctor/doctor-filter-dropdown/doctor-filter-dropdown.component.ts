import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
    selector: 'app-doctor-filter-dropdown',
    templateUrl: './doctor-filter-dropdown.component.html',
    styleUrls: ['./doctor-filter-dropdown.component.scss']
})
export class DoctorFilterDropdownComponent implements OnInit {
    @Input()
    public items: any[];

    @Input()
    public value = 'name';

    @Input()
    public placeholder: string;

    @Input()
    public isNavigate: false;

    @Output()
    public selected = new EventEmitter<any>();

    selectedItem: any;
    expanded = false;

    constructor() {
    }

    ngOnInit() {
    }

    toggleDropdown(e: Event) {
        this.expanded = !this.expanded;
    }

    onSelectAnItem(item: any) {
        this.selectedItem = item;
        this.expanded = false;
        this.selected.emit(item);
    }

    onClickOutside(event) {
        this.expanded = false;
    }

    getDisplayValue() {
        if (!this.selectedItem) {
            return this.placeholder;
        }
        return this.selectedItem.name;
    }
}
