import { Component, OnInit } from '@angular/core';
import { Subscription, switchMap, map } from 'rxjs';

import { OffersService } from '../offers.service';
import { Offer } from 'src/app/interfaces/Offer';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-requested-offers',
  templateUrl: './requested-offers.component.html',
  styleUrls: ['./requested-offers.component.css']
})
export class RequestedOffersComponent implements OnInit{

  requestedOffers: Offer[];
  requestedOffersSubscription$: Subscription;
  user: any;
  
  constructor(private offersService: OffersService, private userService: UserService) {}

  ngOnInit(): void {
    
    this.userService.currentUser$.pipe(
      switchMap((user) => {
        this.user = user;
        return this.offersService.getAllOffers();
      }),
      map((offers) => {
        return Object.values(offers).filter((x) =>
          x.requestedBy?.some((x) => x && x.includes(this.user.uid))
        );
      })
    ).subscribe((filteredOffers) => {
      this.requestedOffers = filteredOffers;
    });
  }

}
