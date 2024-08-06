import { Injectable } from '@angular/core';
import { CustomHttpClientService } from '../custom-http-client.service';
import { CreateProduct } from '../../../contracts/products/create_product';
import { error } from 'node:console';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClientService: CustomHttpClientService) { }

  create(createProduct: CreateProduct, successCallBack?: any, errorCallBack?: (errorMessages:string[]) => void)
  {
    this.httpClientService.post<CreateProduct>( {controller: "Tests" },
      {
        Name: createProduct.Name,
        Stock: createProduct.Stock,
        Price: createProduct.Price,
      }
    )
    .subscribe(
    {
      next: (data) =>{
        if(successCallBack)
          successCallBack();
      },
      //! hata yönetimi
      error: (errorResponse: HttpErrorResponse) => {

        const errorMessages:[] = errorResponse.error;
        errorCallBack(errorMessages);
      }
    })
  }
}
