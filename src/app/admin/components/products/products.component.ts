import { Component } from '@angular/core';
import { BaseComponent, SpinnerType } from '../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { CustomHttpClientService } from '../../../services/common/custom-http-client.service';
import { Product } from '../../../contracts/product';

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

    // ! get request to api with Type
    this.httpClientService.get<Product[]>({
      controller: "Tests",
    })
    .subscribe(data => { console.log(data); });

    // ! post request to api
    // this.httpClientService.post({
    //   controller: "Tests",
    // },
    // {
    //   "name": "Lenovo Legion Y15",
    //   "stock": 41,
    //   "price": 39899
    // }).subscribe(data => { console.log(data)});

    // ! put request to api
    // this.httpClientService.put({
    //   controller: "Tests",
    // },{
    //   "id": "c02933e2-0206-4d8c-b60f-7bec2dbbc4b3",
    //   "name": "Asus Rog Cyphrous 2",
    //   "stock": 74,
    //   "price": 37559
    // }).subscribe();

    // ! delete request to api
    // this.httpClientService.delete({
    //   controller: "Tests"
    // },"628b9934-5bb2-4bc4-aa28-6ddd62dba769").subscribe(data => console.log("Silindi"))

    //! Testing diffirent endpoint (The Endpoint whose BaseUrl isn't registered with app.module.ts => providers)
  //   this.httpClientService.get({
  //     fullEndPoint: "https://jsonplaceholder.typicode.com/comments"
  //   }).subscribe(data => {console.log(data)} );
  
  }
}
