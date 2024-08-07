import { Directive, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { ProductService } from '../../services/common/models/product.service';

declare var $: any;

@Directive({
  selector: '[appDelete2]'
})
export class Delete2Directive {

  constructor( private element: ElementRef, private productService: ProductService) 
  { 
    var img = document.createElement("img");
    img.src = "/assets/delete.png";
    img.style.cursor = "pointer";

    this.element.nativeElement.appendChild(img);
  }

  @Input() id: string;
  @Output() callProductsToUpdateTableData: EventEmitter<any> = new EventEmitter();

  //! html elementinin tıklanıldığını dinler ve tıklanılırsa 'onclick()' adlı, altındaki metodu çalıştırır.
  @HostListener("click") 
  async onclick(){
    const td: HTMLTableCellElement = this.element.nativeElement;
    await this.productService.delete(this.id);
    $(td.parentElement).fadeOut(500, ()=>{
      this.callProductsToUpdateTableData.emit();
    });
  }

}
