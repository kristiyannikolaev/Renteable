import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatNativeDateModule} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete'

import { SharedModule } from '../shared/shared.module';
import { CreateComponent } from './create/create.component';
import { PagesRoutingModule } from './pages-routing.module';
import { HomeComponent } from './home/home.component';
import { DetailsComponent } from './details/details.component';
import { EditComponent } from './edit/edit.component';
import { RequestedOffersComponent } from './requested-offers/requested-offers.component';
import { RecievedRequestsComponent } from './recieved-requests/recieved-requests.component';
import { ErrorComponent } from './error/error.component';



@NgModule({
  declarations: [
    CreateComponent,
    HomeComponent,
    DetailsComponent,
    EditComponent,
    RequestedOffersComponent,
    RecievedRequestsComponent,
    ErrorComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PagesRoutingModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatInputModule,
    MatAutocompleteModule,
    SharedModule
  ]
})
export class PagesModule { }
