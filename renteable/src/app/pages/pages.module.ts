import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import {MatNativeDateModule} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';

import { SharedModule } from '../shared/shared.module';
import { CreateComponent } from './create/create.component';
import { PagesRoutingModule } from './pages-routing.module';
import { HomeComponent } from './home/home.component';
import { DetailsComponent } from './details/details.component';
import { EditComponent } from './edit/edit.component';
import { RequestedOffersComponent } from './requested-offers/requested-offers.component';
import { RecievedRequestsComponent } from './recieved-requests/recieved-requests.component';



@NgModule({
  declarations: [
    CreateComponent,
    HomeComponent,
    DetailsComponent,
    EditComponent,
    RequestedOffersComponent,
    RecievedRequestsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PagesRoutingModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    SharedModule
  ]
})
export class PagesModule { }
