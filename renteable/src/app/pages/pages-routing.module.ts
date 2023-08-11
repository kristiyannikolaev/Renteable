import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { HomeComponent } from './home/home.component';
import { DetailsComponent } from './details/details.component';
import { EditComponent } from './edit/edit.component';
import { RequestedOffersComponent } from './requested-offers/requested-offers.component';
import { RecievedRequestsComponent } from './recieved-requests/recieved-requests.component';

const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'home'},
    { path: 'home', component: HomeComponent},
    { path: 'offers', children: [
        {path: 'create', component: CreateComponent},
        {path: ':id/details', component: DetailsComponent},
        {path: ':id/edit', component: EditComponent},
        {path: 'requested', component: RequestedOffersComponent},
        {path: 'received-requests', component: RecievedRequestsComponent}
    ]},
] 

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule { }