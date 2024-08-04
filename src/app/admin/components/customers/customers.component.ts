import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from '../../../base/base.component';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.scss'
})
export class CustomersComponent extends BaseComponent {
  constructor(spinner: NgxSpinnerService) {
    super(spinner);
  }

  ngOnInit(): void {
    this.showSpinner(SpinnerType.ball_spin_clockwise);
  }
}
