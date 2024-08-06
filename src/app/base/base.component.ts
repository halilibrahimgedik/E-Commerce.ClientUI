import { NgxSpinnerService } from "ngx-spinner";

export class BaseComponent {
    constructor(private spinnerService: NgxSpinnerService){}

    showSpinner(spinnerType: SpinnerType, time?: number):void{
        this.spinnerService.show(spinnerType);
        
        // eğer hideSpinner'ı kullanmayı unutursak, spinner 3 saniye sonra kapansın
        if(time)
            setTimeout(() => { this.spinnerService.hide(spinnerType) }, time);
    }

    hideSpinner(spinnerType: SpinnerType){
        this.spinnerService.hide(spinnerType);
    }
}

export enum SpinnerType{
    ball_Fussion = "ball-fussion",
    ball_Atom = "ball-atom",
    ball_spin_clockwise = "ball-spin-clockwise",
}