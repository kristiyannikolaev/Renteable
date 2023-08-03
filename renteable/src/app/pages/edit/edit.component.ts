import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormBuilder, Validators } from '@angular/forms';

import { Offer } from 'src/app/interfaces/Offer';
import { OffersService } from '../offers.service';
import { categoryOptions } from 'src/app/constants';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit, OnDestroy {

  offer: Offer;
  offerSubscription$: Subscription;
  categories: string[] = categoryOptions;

  constructor(private offersService: OffersService, private activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  editForm = this.fb.group({
    name: ['', [Validators.required]],
    imageUrl: ['', [Validators.required]],
    category: ['', [Validators.required]],
    location: ['', [Validators.required]],
    price: ['', [Validators.required, Validators.pattern('^[1-9][0-9]*.?[0-9]{0,2}$')]],
    description: ['',[Validators.required]]
  })


  ngOnInit() {
    const id = this.activatedRoute.snapshot.params['id'];

    this.offerSubscription$ = this.offersService.getOfferById(id).subscribe((fetchedOffer) => {
      this.editForm.patchValue({
        name: fetchedOffer.name,
        imageUrl: fetchedOffer.imageUrl,
        category: fetchedOffer.category,
        location: fetchedOffer.location,
        price: fetchedOffer.pricePerDay?.toString(),
        description: fetchedOffer.description
      });

      console.log(fetchedOffer.category);
    });
  }

  onUpdate(){
    console.log('form submited');
  }

  onCancel() {
    console.log('Submission canceled');
  }

  ngOnDestroy() {
    this.offerSubscription$.unsubscribe();
  }
}
