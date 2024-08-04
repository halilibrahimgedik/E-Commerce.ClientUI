import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class CustomToastrService {

  constructor(private toastr: ToastrService) { }

  message(message: string, toastrOption: Partial<ToastrOption>){

    this.toastr[toastrOption.messageType](message, toastrOption.Title,{
      positionClass: toastrOption.Position,
      timeOut: toastrOption.TimeOut,
      
      disableTimeOut: false,
      progressBar : true,
      progressAnimation: 'decreasing',
      extendedTimeOut: 1000,
      newestOnTop: true,
      tapToDismiss: true,
      
    });
  }
}

export class ToastrOption{
  messageType: ToastrMessageType = ToastrMessageType.Info;
  Title: string = "Bilgilendirici Mesaj";
  Position : ToastrPosition = ToastrPosition.Top_Center;
  TimeOut : number = 3000;
}

export enum ToastrMessageType{
  Error = "error",
  Success = "success",
  Info = "info",
  Warning = "warning"
}

export enum ToastrPosition{
  Top_Right = "toast-top-right",
  Top_Left = "toast-top-left",
  Top_FullWidth = "toast-top-full-width",
  Top_Center = "toast-top-center",

  Bottom_Right = "toast-bottom-right",
  Bottom_Left = "toast-bottom-left",
  Bottom_FullWidth = "toast-bottom-full-width",
  Bottom_Center = "toast-bottom-center",
}