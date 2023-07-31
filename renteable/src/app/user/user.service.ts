import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userData: any;
  currentUser$ = this.afAuth.authState;

  constructor(private afAuth: AngularFireAuth) { 
    afAuth.authState.subscribe((user) => {
      if(user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
      } else {
        localStorage.removeItem('user');
    }
    });
  }

  login(email: string, password: string) {
    return from(this.afAuth.signInWithEmailAndPassword(email, password));
  }

  register(name: string, email: string, password: string) {
    return from(this.afAuth.createUserWithEmailAndPassword(email, password).then((res) => {
      res.user?.updateProfile({displayName: name });
    }))
  }
  
  logout() {
    return from(this.afAuth.signOut());
  }

}
