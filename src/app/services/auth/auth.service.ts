import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {auth} from 'firebase';
import {from, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private afAuth: AngularFireAuth) {
  }

  login(): Observable<auth.UserCredential> {
    return from(this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider()));
  }
}
