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
  showButtons: boolean = true;
  errMessage = '';
  isLoading: boolean = true;

  constructor(private offersService: OffersService, private userService: UserService) {}

  ngOnInit(): void {
    this.userService.currentUser$.subscribe(user => {
      if(user) {
        this.user = user;
        this.offersService.getReceivedRequests(user.uid).subscribe(() => {
          this.receivedRequests$ = this.offersService.offersSubject.asObservable();
          this.isLoading = false;
        })
      }
    })
  }

  acceptOffer(currentRequest: string, currentOffer: Offer) {
    if(currentRequest.split(' - ').length >= 5)
    this.updateOfferRequestStatus(currentRequest, currentOffer, 'Accepted')?.subscribe({
      error: (err) => window.alert(err.message)
    });
    
  }

  declineOffer(currentRequest: string, currentOffer: Offer) {
    if(currentRequest.split( ' - ').length >= 5) return;
    this.updateOfferRequestStatus(currentRequest, currentOffer, 'Declined')?.subscribe(() => {
      
    })
  }

  updateOfferRequestStatus(request: string, offer: Offer, status: string) {
    if(request.split( ' - ').length >= 5) throw new Error ('You have already made a descision on this request');
    const requests = offer.requestedBy;
    const currRequestIndex = requests?.indexOf(request);
    if(currRequestIndex === -1) return 
    const updatedRequestStatus = request + ` - ${status}`;
    requests?.splice(currRequestIndex!, 1, updatedRequestStatus);
    offer.requestedBy = requests;

    const url = `${firebaseUrl}/offers/${offer._id}.json`;
    return this.offersService.updateOffer(url, offer);
  }
}
