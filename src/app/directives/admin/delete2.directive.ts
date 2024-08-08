import { Directive, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent, DeleteState } from '../../dialogs/delete-dialog/delete-dialog.component';
import { CustomHttpClientService } from '../../services/common/custom-http-client.service';
import { AlertifyService, MessageType, Position } from '../../services/admin/alertify.service';
import { HttpErrorResponse } from '@angular/common/http';
import { DialogService } from '../../services/common/dialog.service';

declare var $: any;

@Directive({
  selector: '[appDelete2]'
})
export class Delete2Directive {

  constructor(
    private element: ElementRef,
    private customHttpService: CustomHttpClientService,
    public dialog: MatDialog,
    private alertifyService: AlertifyService,
    private dialogService: DialogService
  ){ 
    var img = document.createElement("img");
    img.src = "/assets/delete.png";
    img.style.cursor = "pointer";

    this.element.nativeElement.appendChild(img);
  }

  @Input() id: string;
  @Input() controller: string;
  @Output() callProductsToUpdateTableData: EventEmitter<any> = new EventEmitter();

  //! html elementinin tıklanıldığını dinler ve tıklanılırsa 'onclick()' adlı, altındaki metodu çalıştırır.
  @HostListener("click") 
  async onclick(){
    this.dialogService.openDialog({
      afterClosed: async ()=>{
        const td: HTMLTableCellElement = this.element.nativeElement;
        this.customHttpService.delete({
          controller: this.controller
        },this.id).subscribe({
          next: (data) => {
            // silme animasyonları devreye sokalım
            $(td.parentElement).fadeOut(500, ()=>{
              this.callProductsToUpdateTableData.emit();
            });
            this.alertifyService.message(`id'si: ${this.id} olan ürün silinmiştir`,{messageType: MessageType.Warning, position: Position.Top_Right})
          },
          error: (error: HttpErrorResponse) => this.alertifyService.message("Beklenmyen bir hata oluştu",{messageType: MessageType.Error})
        });
      },
      dialogComponentType: DeleteDialogComponent,
      data: DeleteState.Yes,
      width: "20vw"
    });
  }
}