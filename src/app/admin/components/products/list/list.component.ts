import {Component, OnInit, ViewChild } from '@angular/core';
import { ListProduct } from '../../../../contracts/products/list_product';
import { ProductService } from '../../../../services/common/models/product.service';
import { BaseComponent, SpinnerType } from '../../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertifyService, MessageType } from '../../../../services/admin/alertify.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent extends BaseComponent implements OnInit {
  constructor(private productService: ProductService, spinner: NgxSpinnerService, private alertifyService: AlertifyService){
    super(spinner);
  }

  displayedColumns: string[] = ['name', 'stock', 'price', 'createdDate','updatedDate'];
  dataSource: MatTableDataSource<ListProduct> = null;

  
  async ngOnInit() 
  {
    this.showSpinner(SpinnerType.ball_Atom);

    const allProducts: ListProduct[] = await this.productService.getAll( ()=>
      {
        this.hideSpinner(SpinnerType.ball_Atom);
      },
      errorMessage => {
        this.alertifyService.message(errorMessage,{messageType: MessageType.Error})
        this.hideSpinner(SpinnerType.ball_Atom);
      }
    );

    this.dataSource = new MatTableDataSource<ListProduct>(allProducts)
    this.dataSource.paginator = this.paginator;
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;

}
