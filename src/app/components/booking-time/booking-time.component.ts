import {Component, EventEmitter, HostListener, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';


@Component({
  selector: 'app-booking-time',
  templateUrl: './booking-time.component.html',
  styleUrls: ['./booking-time.component.scss']
})
export class BookingTimeComponent implements OnInit, OnChanges {

  public isActive: boolean;
  public placeholder: string;
  public block1 = [
    {
      value: '8:00',
      disabled: false,
    },
    {
      value: '8:20',
      disabled: false,
    },
    {
      value: '8:40',
      disabled: false,
    },
    {
      value: '9:00',
      disabled: false,
    },
    {
      value: '9:20',
      disabled: false,
    },
    {
      value: '9:40',
      disabled: false,
    },
    {
      value: '10:00',
      disabled: false,
    },
    {
      value: '10:20',
      disabled: true,
    },
    {
      value: '10:40',
      disabled: false,
    },
    {
      value: '11:00',
      disabled: false,
    },
    {
      value: '11:20',
      disabled: false,
    },
    {
      value: '11:40',
      disabled: false,
    }
  ];
  public block2 = [
    {
      value: '13:00',
      disabled: false,
    },
    {
      value: '13:20',
      disabled: false,
    },
    {
      value: '13:40',
      disabled: false,
    },
    {
      value: '14:00',
      disabled: false,
    },
    {
      value: '14:20',
      disabled: false,
    },
    {
      value: '14:40',
      disabled: false,
    },
    {
      value: '15:00',
      disabled: false,
    },
    {
      value: '15:20',
      disabled: false,
    },
    {
      value: '15:40',
      disabled: false,
    },
    {
      value: '16:00',
      disabled: false,
    },
    {
      value: '16:20',
      disabled: false,
    },
    {
      value: '16:40',
      disabled: false,
    }
  ];
  public block3 = [
    {
      value: '17:00',
      disabled: false,
    },
    {
      value: '17:20',
      disabled: false,
    },
    {
      value: '17:40',
      disabled: false,
    },
    {
      value: '18:00',
      disabled: false,
    },
    {
      value: '18:20',
      disabled: false,
    },
    {
      value: '18:40',
      disabled: false,
    },
    {
      value: '19:00',
      disabled: false,
    },
    {
      value: '19:20',
      disabled: false,
    },
    {
      value: '19:40',
      disabled: false,
    },
    {
      value: '20:00',
      disabled: false,
    },
    {
      value: '20:20',
      disabled: false,
    },
    {
      value: '20:40',
      disabled: false,
    }
  ];
  @Input() enableTime = [];
  @Output() chooseTime = new EventEmitter<any>();
  private wasInside = false;
  @HostListener('click')
  clickInside() {
    this.wasInside = true;
  }

  @HostListener('document:click')
  clickout() {
    if (!this.wasInside) {
      this.isActive = false;
    }
    this.wasInside = false;
  }

  constructor() {
    this.isActive = false;
  }

  ngOnInit() {}

  handleInputClick() {
    this.isActive = true;
  }

  handleChoose(date) {
    this.placeholder = date.value;
    this.chooseTime.emit(date.value);
    setTimeout (() => {
      this.isActive = false;
    }, 200);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.enableTime) {
      // enable load date
      this.block1 = this.block1.map(item => {
        item.disabled = this.enableTime.indexOf(item.value) === -1;
        return item;
      });

      this.block2 = this.block2.map(item => {
        item.disabled = this.enableTime.indexOf(item.value) === -1;
        return item;
      });

      this.block3 = this.block3.map(item => {
        item.disabled = this.enableTime.indexOf(item.value) === -1;
        return item;
      });
    }
  }

}
