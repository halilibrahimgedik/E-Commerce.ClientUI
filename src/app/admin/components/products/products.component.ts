import { Component, ViewChild } from '@angular/core';
import { BaseComponent, SpinnerType } from '../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { CustomHttpClientService } from '../../../services/common/custom-http-client.service';
import { CreateProduct } from '../../../contracts/products/create_product';
import { ListComponent } from './list/list.component';

@Component({
  selector: 'app-admin-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent extends BaseComponent {
  constructor(spinner: NgxSpinnerService, private httpClientService: CustomHttpClientService) {
    super(spinner);
  }

  ngOnInit(): void {
    this.showSpinner(SpinnerType.ball_spin_clockwise, 500);


  }

  @ViewChild(ListComponent) listComponents : ListComponent
  emittedProduct(emittedProduct: CreateProduct){
    this.listComponents.getProducts();
  }
}
