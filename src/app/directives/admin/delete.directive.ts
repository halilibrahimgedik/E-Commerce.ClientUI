import { Directive, ElementRef, Renderer2 } from '@angular/core';
import { CustomHttpClientService } from '../../services/common/custom-http-client.service';

@Directive({
  selector: '[appDelete]'
})
export class DeleteDirective {

  
  constructor(
    private element: ElementRef, 
    private _renderer: Renderer2, 
    private customHttpClientService: CustomHttpClientService)
  {
    const img = _renderer.createElement("img");
    img.setAttribute("src","/assets/delete.png");
    img.setAttribute("style","cursor: pointer;");

    _renderer.appendChild(element.nativeElement, img)
  }
}
