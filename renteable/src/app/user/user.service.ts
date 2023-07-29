import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, authState } from '@angular/fire/auth';
import { from} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userData: any;
  currentUser$ = authState(this.auth);
  constructor(private auth: Auth) { 
    authState(auth).subscribe((user) => {
      if(user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
      } else {
        localStorage.removeItem('user');
    }
    })
  }

  login(email: string, password: string) {
    return from(signInWithEmailAndPassword(this.auth,email, password))
  }
  
  logout() {
    return from(this.auth.signOut());
  }
}
