import { Injectable } from '@angular/core';
import { CustomHttpClientService } from '../custom-http-client.service';
import { CreateProduct } from '../../../contracts/products/create_product';
import { HttpErrorResponse } from '@angular/common/http';
import { ListProduct } from '../../../contracts/products/list_product';
import { firstValueFrom } from 'rxjs';


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

  async getAll(successCallBack?: () => void, errorCallBack?: (errorMessage: string) => void): Promise<ListProduct[]> {

    // HTTP isteğini yapar ve Observable'ı Promise'a dönüştürür
    const promiseData: Promise<ListProduct[]> = firstValueFrom(
      this.httpClientService.get<ListProduct[]>({
        controller: "Tests"
      })
    );

    // Promise'ı bekler, istek başarılımı kontrol eder ve veriyi döndürür
    promiseData
    .then( data => {
      if(successCallBack)
        successCallBack();
      return data;
    })
    .catch((errorResponse: HttpErrorResponse)=> errorCallBack(errorResponse.message));

    return await promiseData
  }

}
