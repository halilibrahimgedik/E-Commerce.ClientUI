import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from './components/components.module';
import {MatSidenavModule} from '@angular/material/sidenav';





@NgModule({
  declarations: [
    LayoutComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ComponentsModule,
    MatSidenavModule

  ],
  exports:[
    LayoutComponent
  ]
})
export class LayoutModule { }
