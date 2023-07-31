import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { OffersService } from '../offers.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {

  constructor( private fb: FormBuilder, private offersService: OffersService) {}

  createForm = this.fb.group({
    name: ['', [Validators.required]],
    imageUrl: ['', [Validators.required]],
    location: ['', [Validators.required]],
    price: ['', [Validators.required]],
    description: ['', [Validators.required]]
  });

  submit() {
    try{
      const { name, imageUrl, location, price, description } = this.createForm.value;
      this.offersService.createOffer({name, imageUrl, location, pricePerDay: Number(price), description});
    } catch(err) {
      this.createForm.reset();
      console.error();
    }
    
  }

}
