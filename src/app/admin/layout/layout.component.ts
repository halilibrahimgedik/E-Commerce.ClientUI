import { Component, OnInit } from '@angular/core';
import { AlertifyService, MessageType, Position } from '../../services/admin/alertify.service';


@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent implements OnInit{

  constructor(private alertify: AlertifyService) {

  }

  ngOnInit(): void {
  //  this.alertify.message("Alertify Servisi test ediyoruz", {
  //   messageType : MessageType.Error,
  //   position : Position.Top_Center,
  //   delay : 3,
  //  });
  }
}
