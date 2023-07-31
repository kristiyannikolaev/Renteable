import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {

  constructor( private fb: FormBuilder) {}

  createForm = this.fb.group({
    name: ['', [Validators.required]],
    imageUrl: ['', [Validators.required]],
    location: ['', [Validators.required]],
    price: ['', [Validators.required]],
    description: ['', [Validators.required]]
  });

  createOffer() {}

}
