import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { LoaderComponent } from './loader/loader.component';



@NgModule({
  declarations: [
    HeaderComponent,
    LoaderComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    HeaderComponent,
    LoaderComponent
  ]
})
export class SharedModule { }
