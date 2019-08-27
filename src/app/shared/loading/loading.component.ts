import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { LoaderService } from 'src/app/services/loader-service';
import { Subscription, interval } from 'rxjs';
import { debounce } from 'rxjs/operators';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
})
export class LoadingComponent implements OnInit, OnDestroy {
  public visible = false;
  private subscription: Subscription;

  constructor(private loaderService: LoaderService) {}

  ngOnInit() {
    this.subscription = this.loaderService.loaderState
      .pipe(debounce(state => (state.show ? interval(0) : interval(200))))
      .subscribe(state => {
        this.visible = state.show;
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
