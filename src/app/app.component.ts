import { Component, OnInit } from '@angular/core';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from './services/ui/custom-toastr.service';
import $ from 'jquery';
// declare var $: any;


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ECommerceClient';

  constructor(private toastrService: CustomToastrService) {
  }

  ngOnInit(): void {
    // jQuery ile veri çekme
    // $(document).ready(() => {
    //   $.get("https://localhost:7220/api/Tests", function(data) {
    //     console.log(data);
    //   });
    // });
  }
}