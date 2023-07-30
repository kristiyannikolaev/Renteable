import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  passMatchError: string = '';
  user$ = this.userService.currentUser$;

  constructor(private userService: UserService, private router: Router, private http: HttpClient) {}


  submitForm(form: NgForm) {
    if(form.invalid) return;

    const { name, email, password, rePass } = form.value;

    if(password !== rePass) {
      this.passMatchError = 'Passwords don\'t match';
      form.reset();
    }

    this.userService.register(name, email, password).subscribe(() => {
      this.router.navigate(['/user/profile']);
    })
  }
}
