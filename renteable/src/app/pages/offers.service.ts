import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { firebaseUrl } from '../constants'; 
import { UserService } from '../user/user.service';
import { Offer } from '../interfaces/Offer';

@Injectable({
  providedIn: 'root'
})
export class OffersService {

  user: any;
  url: string;

  constructor(private http: HttpClient, private userService: UserService) { 
    userService.currentUser$.subscribe((user) => {
      this.user = user
    });
  }

  createOffer(offerData: Offer) {
    offerData = {
      ...offerData,
      ownerId: this.user?.uid
    }

    let id = '';

    this.url = `${firebaseUrl}/offers.json`;

    this.http.post(this.url, offerData).subscribe((res) => {
      id = Object.values(res)[0];
      offerData = {
        ...offerData,
        _id: id
      };
      
      this.updateOffer(id, offerData).subscribe();
    });
  }

  getAllOffers(): Observable<Offer[]> {
    this.url = `${firebaseUrl}/offers.json`;
    return this.http.get<Offer[]>(this.url);
  }

  getOfferById(id: string) {
    this.url = `${firebaseUrl}/offers/${id}.json`;
    return this.http.get<Offer>(this.url);
  }

  updateOffer(id: string, offerData: Offer) {
    offerData = {
      ...offerData,
      ownerId: this.user?.uid,
      _id: id
    }

    return this.http.put(`${firebaseUrl}/offers/${id}.json`, offerData)
  }

  deleteOffer(id: string) {
    return this.http.delete(`${firebaseUrl}/offers/${id}.json`);
  }
}