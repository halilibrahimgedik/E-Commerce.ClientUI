import { Injectable } from '@angular/core';
import { CustomHttpClientService } from '../custom-http-client.service';
import { CreateProduct } from '../../../contracts/products/create_product';
import { HttpErrorResponse } from '@angular/common/http';
import { ListProduct } from '../../../contracts/products/list_product';
import { firstValueFrom, Observable } from 'rxjs';
import { ListProductWithTotalCount } from '../../../contracts/products/listproduct_with_totalcount';
import { Product } from '../../../contracts/product';


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

  async getAll(page: number = 0, sizePerPage: number = 5, successCallBack?: () => void, errorCallBack?: (errorMessage: string) => void): Promise<ListProductWithTotalCount> {

    // HTTP isteğini yapar ve Observable'ı Promise'a dönüştürür
    const promiseData: Promise<ListProductWithTotalCount> = firstValueFrom(
      this.httpClientService.get<ListProductWithTotalCount>({
        controller: "Tests",
        queryString: `Page=${page}&SizePerPage=${sizePerPage}`
      })
    );

    // Promise'ı bekler, istek başarılımı kontrol eder ve veriyi döndürür
    promiseData
    .then( data => {
      if(successCallBack)
        successCallBack();
      return data;
    })
    .catch((errorResponse: HttpErrorResponse) => errorCallBack(errorResponse.message));

    return await promiseData
  }

  async delete(id: string){
    const deleteObservable: Observable<any> = this.httpClientService.delete<any>({controller:"Tests"}, id);

    await firstValueFrom(deleteObservable);
  }

}
