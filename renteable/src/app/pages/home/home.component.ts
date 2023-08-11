import { Component, OnInit, OnDestroy } from '@angular/core';
import { OffersService } from '../offers.service';
import { Offer } from 'src/app/interfaces/Offer';

import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  offers$: Observable<Offer[]>;
  offersSubscription$: Subscription | undefined;

  constructor(private offerService: OffersService) {}

  ngOnInit() {
    this.offerService.getAllOffers().subscribe(() => {
      this.offers$ = this.offerService.offersSubject.asObservable();
    });
  }

  ngOnDestroy(): void {
    this.offersSubscription$?.unsubscribe();
  }
}
