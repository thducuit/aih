import {Component, EventEmitter, HostListener, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import { compareTwoHours } from 'src/app/utilities';


@Component({
  selector: 'app-booking-time',
  templateUrl: './booking-time.component.html',
  styleUrls: ['./booking-time.component.scss']
})
export class BookingTimeComponent implements OnInit, OnChanges {

  public isActive: boolean;
  public placeholder: string;

  public timeBlocks = [
    {
      label: '8:00 - 11:40',
      blocks: [
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
      ]
    },
    {
      label: '13:00 - 16:40',
      blocks: [
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
      ]
    },
    {
      label: '17:00 - 20:40',
      blocks: [
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
      ]
    }
  ];

  @Input() enableTime = [];
  @Input() animateAfter: boolean;
  @Output() chooseTime = new EventEmitter<any>();

  constructor() {
    this.isActive = false;
  }

  ngOnInit() {}

  onClickOutside(e) {
    this.isActive = false;
  }

  setExpand(expand: boolean) {
    this.isActive = expand;
  }

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
    this.timeBlocks.forEach((blockData) => {
      blockData.blocks.forEach((block) => {
        const hasEnableBlock = (this.enableTime || []).find((x) => {
          return compareTwoHours(x, block.value) === 0;
        });
        block.disabled = !hasEnableBlock;
      });
    });
  }

}
