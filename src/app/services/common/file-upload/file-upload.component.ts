import { Component, Input } from '@angular/core';
import { NgxFileDropEntry } from 'ngx-file-drop';
import { CustomHttpClientService } from '../custom-http-client.service';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { error } from 'console';
import { AlertifyService } from '../../admin/alertify.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../ui/custom-toastr.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.scss'
})
export class FileUploadComponent {

  constructor(
    private customHttpService: CustomHttpClientService,
    private alertifyService: AlertifyService,
    private customToastrService: CustomToastrService
  ){}

  @Input() options: Partial<FileUploadOptions>;

  public files: NgxFileDropEntry[];

  public selectedFiles(files: NgxFileDropEntry[]) {
    this.files = files;
    const fileData: FormData = new FormData();
    for(const file of files){
      (file.fileEntry as FileSystemFileEntry).file((_file: File) => {
        fileData.append(_file.name, _file, file.relativePath);
      });
    }

    this.customHttpService.post({
      controller: this.options.controller,
      action: this.options.action,
      queryString: this.options.queryString,
      headers: new HttpHeaders({"responseType": "blob"})
    }, fileData).subscribe({
      next: (data) => {
        this.customToastrService.message("Dosyalar Başarıyla Yüklenmiştir.",{
          messageType: ToastrMessageType.Success,
          Position: ToastrPosition.Top_Right
        })
      },
      error: (error: HttpErrorResponse) => {
        if(this.options.isAdminPage)
        {
          this.customToastrService.message(error.message,{
            messageType: ToastrMessageType.Error,
            Position: ToastrPosition.Top_Right
          })
        }else{
          this.customToastrService.message("Dosyalar yüklenirken bir hata meydana geldi.",{
            messageType: ToastrMessageType.Error,
            Position: ToastrPosition.Top_Right
          })
        }
      }
    })
  }
}

export class FileUploadOptions{
  controller?: string;
  action?: string;
  queryString?: string;
  explanation?: string;
  accept?: string;
  isAdminPage?: boolean = false; // admin sayfası ise hata meydana gelirse uyarı farklı olucak, client sayfası ise hata mesajı farklı olucak
}
