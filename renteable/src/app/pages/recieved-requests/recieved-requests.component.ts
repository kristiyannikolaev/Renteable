import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { firebaseUrl } from 'src/app/constants';
import { Offer } from 'src/app/interfaces/Offer';
import { OffersService } from '../offers.service';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-recieved-requests',
  templateUrl: './recieved-requests.component.html',
  styleUrls: ['./recieved-requests.component.css']
})
export class RecievedRequestsComponent implements OnInit {
  receivedRequests$: Observable<Offer[]>
  user: any;
  constructor(private offersService: OffersService, private userService: UserService) {}

  ngOnInit(): void {
    this.userService.currentUser$.subscribe(user => {
      if(user) {
        this.user = user;
        this.offersService.getReceivedRequests(user.uid).subscribe(() => {
          this.receivedRequests$ = this.offersService.offersSubject.asObservable();
        })
      }
    })
  }
}
