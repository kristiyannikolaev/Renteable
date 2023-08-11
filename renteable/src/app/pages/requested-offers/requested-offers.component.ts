import { Component, OnInit } from '@angular/core';
import { Subscription, switchMap, map, Observable } from 'rxjs';

import { OffersService } from '../offers.service';
import { Offer } from 'src/app/interfaces/Offer';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-requested-offers',
  templateUrl: './requested-offers.component.html',
  styleUrls: ['./requested-offers.component.css']
})
export class RequestedOffersComponent implements OnInit{

  requestedOffers$: Observable<Offer[] | null>;
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
        const filteredOffers =  Object.values(offers).filter((x) =>
          x.requestedBy?.some((x) => x && x.includes(this.user.uid))
        );

        this.offersService.offersSubject.next(filteredOffers);
      })
    ).subscribe(() => {
      this.requestedOffers$ = this.offersService.offersSubject.asObservable();
    });
  }

}
