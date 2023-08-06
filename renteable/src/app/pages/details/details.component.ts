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
  offerSubscription$: Subscription;
  user$: Observable<any>;
  userSubscription$: Subscription;
  id: string;
  alreadySubmitted: boolean = false;

  constructor(private offersService: OffersService, private activatedRouted: ActivatedRoute, private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.id = this.activatedRouted.snapshot.params['id'];

    this.offerSubscription$ = this.offersService.getOfferById(this.id).subscribe((fetchedOffer) => {
      this.offer = fetchedOffer;
    });

    this.user$ = this.userService.currentUser$;

    this.offersService.checkIfSubmitted(this.id).subscribe((res) => {
      this.alreadySubmitted = res;
    });
  }

  onDelete() {
    this.offersService.deleteOffer(this.id).subscribe(() => {
      this.router.navigate(['/home']);
    })
  }

  checkIfSubmitted() {
    console.log(this.offersService.user.uid);
  }

  onSubmitRequest() {
    this.offersService.submitOfferRequest(this.id).subscribe({
      error: (err) => console.error(err.message)
    })
  }

  ngOnDestroy() {
    this.offerSubscription$.unsubscribe();
  }
}