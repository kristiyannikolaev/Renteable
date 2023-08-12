import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { HomeComponent } from './home/home.component';
import { DetailsComponent } from './details/details.component';
import { EditComponent } from './edit/edit.component';
import { RequestedOffersComponent } from './requested-offers/requested-offers.component';
import { RecievedRequestsComponent } from './recieved-requests/recieved-requests.component';
import { canActivate,redirectUnauthorizedTo, redirectLoggedInTo} from '@angular/fire/compat/auth-guard'
import { ErrorComponent } from './error/error.component';

const redirectToLogin = () => redirectUnauthorizedTo(['user/login']);

const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'home'},
    { path: 'home', component: HomeComponent},
    { path: 'offers', children: [
        {path: 'create', component: CreateComponent, ...canActivate(redirectToLogin)},
        {path: ':id/details', component: DetailsComponent},
        {path: ':id/edit', component: EditComponent, ...canActivate(redirectToLogin)},
        {path: 'requested', component: RequestedOffersComponent, ...canActivate(redirectToLogin)},
        {path: 'received-requests', component: RecievedRequestsComponent, ...canActivate(redirectToLogin)}
    ]},
    { path: '**', component: ErrorComponent},
] 

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule { }