import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { OffersService } from '../offers.service';
import { Router } from '@angular/router';

import { categoryOptions } from 'src/app/constants';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {

  categories: string[] = categoryOptions;

  constructor( private fb: FormBuilder, private offersService: OffersService, private router: Router) {}

  createForm = this.fb.group({
    name: ['', [Validators.required]],
    imageUrl: ['', [Validators.required]],
    category: ['', [Validators.required]],
    location: ['', [Validators.required]],
    price: ['', [Validators.required, Validators.pattern('^[1-9][0-9]*.?[0-9]{0,2}$')]],
    description: ['', [Validators.required]]
  });

  submit() {
    try{
      const { name, imageUrl, category, location, price, description } = this.createForm.value;
      this.createForm.reset();
      this.offersService.createOffer({name, imageUrl, category, location, pricePerDay: Number(price), description});
      this.router.navigate(['/home']);
      
    } catch(err) {
      this.createForm.reset();
      console.error();
    }
    
  }

}
