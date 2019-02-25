import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {auth} from 'firebase';
import {from, Observable} from 'rxjs';
import {switchMap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  get loggedIn(): boolean {
    return this.user != null;
  }

  get user(): firebase.User {
    console.log('hello', this.afAuth.authState);
    return this.afAuth.auth.currentUser;
  }

  constructor(private afAuth: AngularFireAuth) {
  }

  login(): Observable<auth.UserCredential> {
    return from(this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider()));
  }

  logout(): Observable<void> {
    return from(this.afAuth.auth.signOut());
  }
}
