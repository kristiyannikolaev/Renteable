import { Component, OnInit, OnDestroy } from '@angular/core';
import { OffersService } from '../offers.service';
import { Offer } from 'src/app/interfaces/Offer';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  offers: Offer[];
  offersSubscription$: Subscription | undefined;

  constructor(private offerService: OffersService) {}

  ngOnInit() {
    this.offersSubscription$ = this.offerService.getAllOffers().subscribe((offers) => {
      this.offers = Object.values(offers);
    })
  }

  ngOnDestroy(): void {
    this.offersSubscription$?.unsubscribe();
  }
}
