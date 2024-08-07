import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ProductService } from '../../../../services/common/models/product.service';
import { CreateProduct } from '../../../../contracts/products/create_product';
import { BaseComponent, SpinnerType } from '../../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertifyService, MessageType, Position } from '../../../../services/admin/alertify.service';
import { FileUploadOptions } from '../../../../services/common/file-upload/file-upload.component';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})
export class CreateComponent extends BaseComponent {

  // fileUpload için eklendi
  @Output() fileUploadOptions: Partial<FileUploadOptions> = {
    action: "Upload",
    controller: "Tests",
    explanation: "Resimleri sürükleyin veya seçin...",
    isAdminPage: true,
    accept:".png, .jpg, .jpeg",
  };

  constructor(private productService: ProductService,spinner: NgxSpinnerService, private alertifyService: AlertifyService)
  {
    super(spinner);
  }

  @Output() emitProduct : EventEmitter<CreateProduct> = new EventEmitter();

  create(name: HTMLInputElement, stock: HTMLInputElement, price: HTMLInputElement){
    this.showSpinner(SpinnerType.ball_Fussion);

    const product = new CreateProduct();
    product.Name = name.value;
    product.Stock = parseInt(stock.value);
    product.Price = parseFloat(price.value);

    this.productService.create(product, ()=> {
      this.hideSpinner(SpinnerType.ball_Fussion);
      this.alertifyService.dismiss(); // önceki mesajları silecek

      this.alertifyService.message("Product Başarıyla Kaydedilmiştir.", {
        messageType: MessageType.Success,
        position: Position.Top_Right
      });

      this.emitProduct.emit( new CreateProduct());
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
