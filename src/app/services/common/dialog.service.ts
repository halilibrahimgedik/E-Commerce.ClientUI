import { Injectable } from '@angular/core';
import { DialogPosition, MatDialog } from '@angular/material/dialog';
import { ComponentType } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) { }

  
  openDialog(dialogParameters: Partial<DialogParameters>): void 
  {
    const dialogRef = this.dialog.open(dialogParameters.dialogComponentType, {
      width: dialogParameters.width,
      height: dialogParameters.height,
      position: dialogParameters.position,
      data: dialogParameters.data,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == dialogParameters.data) 
        dialogParameters.afterClosed();
    });
  }

}

export class DialogParameters{
  dialogComponentType: ComponentType<any>;
  data: any;
  afterClosed: () => void;

  width?: string = '500px';
  height?: string;
  position?: DialogPosition;
}
