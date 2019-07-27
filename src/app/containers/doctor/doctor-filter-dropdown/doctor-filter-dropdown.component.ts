import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-doctor-filter-dropdown',
  templateUrl: './doctor-filter-dropdown.component.html',
  styleUrls: ['./doctor-filter-dropdown.component.scss']
})
export class DoctorFilterDropdownComponent implements OnInit {
  @Input()
  public items: any[];

  @Input()
  public value = 'value';

  @Input()
  public placeholder: string;

  @Output()
  public selected = new EventEmitter<any>();

  selectedItem: any;
  expanded = false;

  constructor() { }

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

  getValue(item: any) {
    return item && item[this.value];
  }

  getDisplayValue() {
    if (!this.selectedItem) { return this.placeholder; }
    return this.selectedItem[this.value];
  }
}
