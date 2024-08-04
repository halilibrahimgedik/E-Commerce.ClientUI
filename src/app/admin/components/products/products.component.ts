import { Component } from '@angular/core';
import { BaseComponent, SpinnerType } from '../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-admin-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent extends BaseComponent {
  constructor(spinner: NgxSpinnerService) {
    super(spinner);
  }

  ngOnInit(): void {
    this.showSpinner(SpinnerType.ball_spin_clockwise);
  }
}
