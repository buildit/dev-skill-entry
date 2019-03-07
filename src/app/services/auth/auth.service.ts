import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {auth} from 'firebase';
import {from, Observable, of} from 'rxjs';
import {switchMap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  get user(): any {
    return localStorage.getItem('user');
  }

  get authenticated(): boolean {
    return !!localStorage.getItem('user');
  }

  constructor(private afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe((authenticated) => {
      if (authenticated) {
        localStorage.setItem('user', JSON.stringify(authenticated));
      }
    });
  }

  login(): Observable<auth.UserCredential> {
    return from(this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider()));
  }

  logout(): Observable<void> {
    return from(this.afAuth.auth.signOut());
  }
}
