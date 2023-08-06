import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { OffersService } from '../offers.service';
import { Offer } from 'src/app/interfaces/Offer';

@Component({
  selector: 'app-requested-offers',
  templateUrl: './requested-offers.component.html',
  styleUrls: ['./requested-offers.component.css']
})
export class RequestedOffersComponent implements OnInit{

  requestedOffers: Offer[];
  requestedOffersSubscription$: Subscription;
  
  constructor(private offersService: OffersService) {}

  ngOnInit(): void {
    this.requestedOffersSubscription$ = this.offersService.getAllOffers().subscribe((offers) => {
      this.requestedOffers = Object.values(offers).filter((x) => x.requestedBy?.includes(this.offersService.user?.uid));
    });
  }

}
