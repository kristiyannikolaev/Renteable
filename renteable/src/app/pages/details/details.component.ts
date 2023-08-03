import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

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
  id: string;

  constructor(private offersService: OffersService, private activatedRouted: ActivatedRoute, private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.id = this.activatedRouted.snapshot.params['id'];

    this.offerSubscription$ = this.offersService.getOfferById(this.id).subscribe((fetchedOffer) => {
      this.offer = fetchedOffer;
    });

    this.user$ = this.userService.currentUser$;
  }

  onDelete() {
    this.offersService.deleteOffer(this.id).subscribe(() => {
      this.router.navigate(['/home']);
    })
  }

  onSubmitRequest() {
    this.offersService.submitOfferRequest(this.id);
  }

  ngOnDestroy() {
    this.offerSubscription$.unsubscribe();
  }

}
