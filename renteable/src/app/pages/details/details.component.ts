import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

import { UserService } from 'src/app/user/user.service';
import { Offer } from 'src/app/interfaces/Offer';
import { OffersService } from '../offers.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent {

  offer: Offer;
  private offerSubscription$: Subscription;
  user$: Observable<any>;

  constructor(private offersService: OffersService, private activatedRouted: ActivatedRoute, private userService: UserService) {}

  ngOnInit() {
    const id = this.activatedRouted.snapshot.params['id'];

    this.offerSubscription$ = this.offersService.getOfferById(id).subscribe((fetchedOffer) => {
      this.offer = fetchedOffer;
    });

    this.user$ = this.userService.currentUser$;
  }

  ngOnDestroy() {
    this.offerSubscription$.unsubscribe();
  }

}
