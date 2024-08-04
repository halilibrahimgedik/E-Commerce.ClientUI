import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from '../../../base/base.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent extends BaseComponent{
  constructor(spinner: NgxSpinnerService) {
    super(spinner);
  }

  ngOnInit(): void {
    this.showSpinner(SpinnerType.ball_spin_clockwise);
  }
}
