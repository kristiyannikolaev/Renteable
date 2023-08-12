import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { canActivate, redirectLoggedInTo} from '@angular/fire/compat/auth-guard'


const redirectToHome = () => redirectLoggedInTo(['/home']);
const routes: Routes = [
    { path: 'user/login', component: LoginComponent, ...canActivate(redirectToHome) },
    { path: 'user/register', component: RegisterComponent, ...canActivate(redirectToHome) },
    { path: 'user/profile', component: ProfileComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserRoutingModule { }