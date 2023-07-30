import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  passMatchError: string = '';

  submitForm(form: NgForm) {
    if(form.invalid) return;

    const { name, email, password, rePass } = form.value;

    if(password !== rePass) {
      this.passMatchError = 'Passwords don\'t match';
      form.reset();
    }
  }
}
