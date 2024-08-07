import {Component, OnInit, ViewChild } from '@angular/core';
import { ListProduct } from '../../../../contracts/products/list_product';
import { ProductService } from '../../../../services/common/models/product.service';
import { BaseComponent, SpinnerType } from '../../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertifyService, MessageType } from '../../../../services/admin/alertify.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ListProductWithTotalCount } from '../../../../contracts/products/listproduct_with_totalcount';

declare var $: any;

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent extends BaseComponent implements OnInit {

  displayedColumns: string[] = ['name', 'stock', 'price', 'createdDate','updatedDate', 'edit', 'delete'];
  dataSource: MatTableDataSource<ListProduct> = null;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private productService: ProductService, spinner: NgxSpinnerService, private alertifyService: AlertifyService){
    super(spinner);
  }

  ngOnInit() 
  {
    this.getProducts();
  }

  async getProducts(page?: number, sizePerPage?: number)
  {
    this.showSpinner(SpinnerType.ball_Atom);

    const allProducts: ListProductWithTotalCount = await this.productService.getAll(this.paginator ? this.paginator.pageIndex : 0,
      this.paginator ? this.paginator.pageSize : 5,
      ()=>{
        this.hideSpinner(SpinnerType.ball_Atom);
      },
      errorMessage => {
        this.alertifyService.message(errorMessage,{messageType: MessageType.Error})
        this.hideSpinner(SpinnerType.ball_Atom);
      }
    );

    this.dataSource = new MatTableDataSource<ListProduct>(allProducts.products)
    this.paginator.length = allProducts.totalCount;
  }

  async pageChanged(){
    await this.getProducts()
  }
}
