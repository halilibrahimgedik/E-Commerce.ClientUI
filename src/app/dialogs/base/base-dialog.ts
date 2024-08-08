import { MatDialogRef } from "@angular/material/dialog";

export class BaseDialog<TypeOfDialogComponent> {
    constructor(public dialogRef: MatDialogRef<TypeOfDialogComponent>){

    }

    close(){
        this.dialogRef.close();
    }
}

export enum DialogState{
    Yes,
    No
}
