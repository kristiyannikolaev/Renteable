import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { OffersService } from '../offers.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {

  constructor( private fb: FormBuilder, private offersService: OffersService, private router: Router) {}

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
      this.createForm.reset();
      this.offersService.createOffer({name, imageUrl, location, pricePerDay: Number(price), description});
      this.router.navigate(['/home']);
      
    } catch(err) {
      this.createForm.reset();
      console.error();
    }
    
  }

}
