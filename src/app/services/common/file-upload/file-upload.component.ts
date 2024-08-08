import { Component, Input } from '@angular/core';
import { NgxFileDropEntry } from 'ngx-file-drop';
import { CustomHttpClientService } from '../custom-http-client.service';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../ui/custom-toastr.service';
import { FileUploadDialogComponent, FileUploadDialogState } from '../../../dialogs/file-upload-dialog/file-upload-dialog.component';
import { DialogService } from '../dialog.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.scss'
})
export class FileUploadComponent {

  constructor(
    private customHttpService: CustomHttpClientService,
    private customToastrService: CustomToastrService,
    private dialogService: DialogService
  ){}

  public files: NgxFileDropEntry[];

  
  @Input() options: Partial<FileUploadOptions>;

  public selectedFiles(files: NgxFileDropEntry[]) {
    this.files = files;
    const formData: FormData = new FormData(); // gelen resimleri FormData'ya ekleyip api'ye istek atacağız
    for(const file of files){
      (file.fileEntry as FileSystemFileEntry).file((_file: File) => {
        formData.append(_file.name, _file, file.relativePath);
      });
    }

    this.dialogService.openDialog({
      afterClosed: () => {
        this.customHttpService.post({
          controller: this.options.controller,
          action: this.options.action,
          queryString: this.options.queryString,
          headers: new HttpHeaders({"responseType": "blob"})
        }, formData).subscribe({
          next: (data) => {
            this.customToastrService.message("Seçilen dosyalar Başarılı bir şekilde Yüklenmiştir.",{
              messageType: ToastrMessageType.Success,
              Position: ToastrPosition.Top_Right,
              TimeOut: 3000,
              Title: "Yükleme Başarılı"
            })
          },
          error: (error: HttpErrorResponse) => {
            if(this.options.isAdminPage)
            {
              this.customToastrService.message(error.message,{
                messageType: ToastrMessageType.Error,
                Position: ToastrPosition.Top_Right,
                TimeOut: 3000,
                Title: "Yükleme Başarısız"
              })
            }else{
              this.customToastrService.message("Dosyalar yüklenirken bir hata meydana geldi.",{
                messageType: ToastrMessageType.Error,
                Position: ToastrPosition.Top_Right,
                TimeOut: 3000,
                Title: "Yükleme Başarısız"
              })
            }
          }
        })
      },
      dialogComponentType: FileUploadDialogComponent,
      data: FileUploadDialogState.Yes,
    });
   
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
