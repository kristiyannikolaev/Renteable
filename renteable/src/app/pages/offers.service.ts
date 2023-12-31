import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, switchMap, BehaviorSubject } from 'rxjs';

import { firebaseUrl } from '../constants'; 
import { UserService } from '../user/user.service';
import { Offer } from '../interfaces/Offer';

@Injectable({
  providedIn: 'root'
})
export class OffersService {

  user: any;
  userUid: string;
  url: string;
  requestedByArr: any[] = [];

  offersSubject = new BehaviorSubject<any[]>([]);

  constructor(private http: HttpClient, private userService: UserService) { 
    userService.currentUser$.subscribe((user) => {
      this.user = user;
      this.userUid = user!.uid;
    });
  }

  createOffer(offerData: Offer): Observable<any> {
    offerData = {
      ...offerData,
      requestedBy: [],
      ownerId: this.user?.uid,
      ownerName: this.user?.displayName
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
    return this.http.get<Offer[]>(this.url).pipe(
      map(offers => {
        const offersArr = Object.values(offers);
        this.offersSubject.next(offersArr);
        return offersArr;
      })
    )
  }

  getOfferById(id: string) {
    this.url = `${firebaseUrl}/offers/${id}.json`;
    return this.http.get<Offer>(this.url);
  }

 getReceivedRequests(userUid: string): Observable<Offer[]> {
  this.url = `${firebaseUrl}/offers.json`;
    return this.http.get<Offer[]>(this.url).pipe(
      map(offers => {
        const receivedRequests = Object.values(offers).filter(offer => offer.ownerId === userUid);
        this.offersSubject.next(receivedRequests);
        return receivedRequests;
      })
    )
 }

  searchOffers(query: string) {
    this.url = `${firebaseUrl}/offers.json`;
    return this.http.get<Offer[]>(this.url).pipe(
      map( offers => {
        const filteredOffers = Object.values(offers).filter(offer => offer.name?.toLowerCase().includes(query.toLowerCase()));
        this.offersSubject.next(filteredOffers);
      })
    )
  }

  filterByCategory(category: string) {
    this.url = `${firebaseUrl}/offers.json`;
    return this.http.get<Offer[]>(this.url).pipe(
      map(offers => {
        const filteredOffers = Object.values(offers).filter((offer) => !category || offer.category === category);
        this.offersSubject.next(filteredOffers);
      })
    )
  }

  updateOffer(url: string, offerData: Offer  | string[]) {
    // offerData = {
    //   ...offerData,
    //   ownerId: this.user?.uid,
    //   _id: id
    // }

    return this.http.put(url, offerData)
  }

  submitOfferRequest(id: string, startDate: Date, duration: number): Observable<any> {
    this.url = `${firebaseUrl}/offers/${id}/requestedBy.json`;

    return  this.getRequestedByArray(this.url).pipe(
      switchMap((res: any) => {
        this.requestedByArr = res ? Object.values(res) : [];

        const usersUrl = `${firebaseUrl}/users.json`;
        return this.http.get(usersUrl).pipe(
          map((users) => {
            const user = Object.values(users).filter(u => u.uid === this.user.uid);
            const displayName = user[0].displayName;
            
            this.requestedByArr.push(`${this.user.uid} - ${startDate} - ${duration} - ${displayName}`);

            return this.updateOffer(this.url, this.requestedByArr).subscribe();
          })
        )
      })
    )
  }

  checkIfSubmitted(id: string) {
    this.url = `${firebaseUrl}/offers/${id}/requestedBy.json`;
  
    return this.http.get(this.url).pipe(
      map((res:any) => {
        if (!res) {
          return false;
        }
        return Object.values(res).some((request: any) => request.indexOf(this.user.uid) !== -1);
      })
    );
  }

  getRequestedByArray(url: string) {
    return this.http.get(url);
  }

  deleteOffer(id: string) {
    return this.http.delete(`${firebaseUrl}/offers/${id}.json`);
  }
}