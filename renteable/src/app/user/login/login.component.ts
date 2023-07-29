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

  constructor(private userService: UserService ,private router: Router) {}

  submitForm(form: NgForm) {
    if(!form.valid) return;

    const { email, password } = form.value;
    this.userService.login(email, password).subscribe(() => {
      this.router.navigate(['/user/register']);
    })
  }
}
