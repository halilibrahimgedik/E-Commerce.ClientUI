import { Component, OnInit } from '@angular/core';
// import $ from 'jquery';
declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ECommerceClient';

  ngOnInit(): void {

  }
}