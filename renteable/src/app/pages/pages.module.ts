import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { CreateComponent } from './create/create.component';
import { PagesRoutingModule } from './pages-routing.module';
import { HomeComponent } from './home/home.component';
import { DetailsComponent } from './details/details.component';
import { EditComponent } from './edit/edit.component';
import { RequestedOffersComponent } from './requested-offers/requested-offers.component';



@NgModule({
  declarations: [
    CreateComponent,
    HomeComponent,
    DetailsComponent,
    EditComponent,
    RequestedOffersComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PagesRoutingModule,
  ]
})
export class PagesModule { }
