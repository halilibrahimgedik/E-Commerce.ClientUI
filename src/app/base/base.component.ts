import { NgxSpinnerService } from "ngx-spinner";

export class BaseComponent {
    constructor(private spinnerService: NgxSpinnerService){}

    showSpinner(spinnerType: SpinnerType){
        this.spinnerService.show(spinnerType);

        // eğer hideSpinner'ı kullanmayı unutursak, spinner 3 saniye sonra kapansın
        setTimeout(() => { this.spinnerService.hide(spinnerType) }, 500)
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