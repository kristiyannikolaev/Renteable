import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { from, map, Observable, catchError, throwError } from 'rxjs';

import { firebaseUrl } from '../constants';
import { UserInterface } from '../interfaces/User';
import { HttpClient } from '@angular/common/http';
import { Offer } from '../interfaces/Offer';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userData: any;
  currentUser$ = this.afAuth.authState;

  constructor(private afAuth: AngularFireAuth, private http: HttpClient) { 
    afAuth.authState.subscribe((user) => {
      if(user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
      } else {
        localStorage.removeItem('user');
    }
    });
  }

  isAuthenticated():boolean {
    return localStorage.getItem('user') ? true : false;
  }

  login(email: string, password: string) {
    return  new Observable(observer => {
      this.afAuth.signInWithEmailAndPassword(email, password).then((res) => {
        observer.complete();
      })
      .catch(error => {
        const errorMessage = 'Invalid username or password';
        observer.error(errorMessage);
      });
    }).pipe(
      catchError(error => {
        return throwError(error);
      })
    )
  }

  register(name: string, email: string, password: string) {
    return  new Observable(observer => {
      this.afAuth.createUserWithEmailAndPassword(email, password).then((res) => {
        res.user?.updateProfile({displayName: name }).then(
          () => this.setUserData(res.user).subscribe(() => {
            observer.complete();
          })
        );
      }).catch(error => {
        const errorMessage = 'Email already in use';
        observer.error(errorMessage);
      }) 
    }).pipe(
      catchError(error => {
        return throwError(error);
      })
    )
  }
  
  logout() {
    return from(this.afAuth.signOut());
  }

  setUserData(user: any) {
    const url = `${firebaseUrl}/users.json`;
    const userData: UserInterface = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName
    }

    return this.http.post(url, userData);
  }

  // addUserDisplayName(offer: Offer, uid: string) {
  //   const usersUrl = `${firebaseUrl}/users.json`;
  //   this.http.get(usersUrl).pipe(
  //     map(users => {
  //       const user = Object.values(users).filter(user => user.uid === uid);
  //       const dispayName = 
  //     })
  //   )
  // }

}
