import { Injectable } from '@angular/core';
declare var alertify: any;

@Injectable({
  providedIn: 'root'
})
export class AlertifyService {

  constructor() { }

  message(message: string, options: Partial<AlertifyOptions>)
  {
    alertify.set('notifier','delay', options.delay);
    alertify.set('notifier','position', options.position);
    alertify[options.messageType](message);
  }

  dismiss(){
    alertify.dismissAll();
  }
}

export class AlertifyOptions{
  messageType?: MessageType = MessageType.Message;
  position? : Position = Position.Bottom_Right;
  delay? : number = 3;
}

export enum MessageType{
  Error = "error",
  Success = "success",
  Warning = "warning",
  Notify = "Notify",
  Message = "Message"
}

export enum Position{
  Top_Center = "top-center",
  Top_Right = "top-right",
  Top_Left = "top-left",
  Bottom_Center = "bottom-center",
  Bottom_Right = "bottom-right",
  Bottom_Left = "bottom-left",
}
