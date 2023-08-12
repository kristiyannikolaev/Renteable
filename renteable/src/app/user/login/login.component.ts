import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from '../user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {


  constructor(private userService: UserService, private router: Router) {}

  submitForm(form: NgForm) {
    if(!form.valid) return;

    try{
      const { email, password } = form.value;
    
      this.userService.login(email, password).subscribe(
        () => {
        this.router.navigate(['/home']);
        },
        error => {
          window.alert(error);
        }
        );

      form.reset();
    } catch(err: any) {
      if(err.message.includes('wrong-password') || err.message.includes('user-not-found')) {
        console.log('here');
        window.alert('Invalid username or password');
      }
    }
  }
}
