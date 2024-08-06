import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../../services/common/models/product.service';
import { CreateProduct } from '../../../../contracts/products/create_product';
import { BaseComponent, SpinnerType } from '../../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertifyService, MessageType, Position } from '../../../../services/admin/alertify.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})
export class CreateComponent extends BaseComponent {

  constructor(private productService: ProductService,spinner: NgxSpinnerService, private alertifyService: AlertifyService)
  {
    super(spinner);
  }

  create(name: HTMLInputElement, stock: HTMLInputElement, price: HTMLInputElement)
  {
    this.showSpinner(SpinnerType.ball_Fussion);

    const product = new CreateProduct();
    product.Name = name.value;
    product.Stock = parseInt(stock.value);
    product.Price = parseFloat(price.value);

    this.productService.create(product, ()=> {
      this.hideSpinner(SpinnerType.ball_Fussion);
      this.alertifyService.dismiss(); // önceki mesajları silecek

      this.alertifyService.message("Product Başarıyla Kaydedilmiştir.",
        {
          messageType: MessageType.Success,
          position: Position.Top_Right
        });
    }, 
    (errorMessages: string[]) => {
      this.hideSpinner(SpinnerType.ball_Fussion);
      this.alertifyService.dismiss(); // önceki mesajları silecek
      errorMessages.forEach(errorMessage => {
        this.alertifyService.message(errorMessage,{messageType:MessageType.Error, position: Position.Top_Right});
      });
    })
  }

}