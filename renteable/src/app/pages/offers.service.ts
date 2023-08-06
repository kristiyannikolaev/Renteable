import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, switchMap } from 'rxjs';

import { firebaseUrl } from '../constants'; 
import { UserService } from '../user/user.service';
import { Offer } from '../interfaces/Offer';

@Injectable({
  providedIn: 'root'
})
export class OffersService {

  user: any;
  url: string;
  requestedByArr: string[] = [];

  constructor(private http: HttpClient, private userService: UserService) { 
    userService.currentUser$.subscribe((user) => {
      this.user = user
    });
  }

  createOffer(offerData: Offer): Observable<any> {
    offerData = {
      ...offerData,
      requestedBy: [],
      ownerId: this.user?.uid,
    };

    this.url = `${firebaseUrl}/offers.json`;

    return this.http.post(this.url, offerData).pipe(
      switchMap((res) => {
        const id = Object.values(res)[0];
        const updatedOfferData = {
          ...offerData,
          _id: id
        };

        this.url = `${firebaseUrl}/offers/${id}/.json`

        return this.updateOffer(this.url, updatedOfferData);
      })
    )
  }

  getAllOffers(): Observable<Offer[]> {
    this.url = `${firebaseUrl}/offers.json`;
    return this.http.get<Offer[]>(this.url);
  }

  getOfferById(id: string) {
    this.url = `${firebaseUrl}/offers/${id}.json`;
    return this.http.get<Offer>(this.url);
  }

  updateOffer(url: string, offerData: Offer  | string[]) {
    // offerData = {
    //   ...offerData,
    //   ownerId: this.user?.uid,
    //   _id: id
    // }

    return this.http.put(url, offerData)
  }

  submitOfferRequest(id: string): Observable<any> {
    this.url = `${firebaseUrl}/offers/${id}/requestedBy.json`;

    return  this.getRequestedByArray(this.url).pipe(
      switchMap((res: any) => {
        this.requestedByArr = res ? Object.values(res) : [];
        this.requestedByArr.push(this.user.uid);

        return this.updateOffer(this.url, this.requestedByArr)
      })
    )
  }

  checkIfSubmitted(id: string) {
    this.url = `${firebaseUrl}/offers/${id}/requestedBy.json`;
    
    return this.http.get(this.url).pipe(
      map((res: any) => {
        return Object.values(res).includes(this.user.uid);
      })
    )
  }

  getRequestedByArray(url: string) {
    return this.http.get(url);
  }

  deleteOffer(id: string) {
    return this.http.delete(`${firebaseUrl}/offers/${id}.json`);
  }
}