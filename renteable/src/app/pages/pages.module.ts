import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { CreateComponent } from './create/create.component';
import { PagesRoutingModule } from './pages-routing.module';
import { HomeComponent } from './home/home.component';
import { DetailsComponent } from './details/details.component';
import { EditComponent } from './edit/edit.component';



@NgModule({
  declarations: [
    CreateComponent,
    HomeComponent,
    DetailsComponent,
    EditComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PagesRoutingModule,
  ]
})
export class PagesModule { }
