import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {auth} from 'firebase';
import {from, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  get user(): any {
    return JSON.parse(localStorage.getItem('user'));
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

  loginWithGoogle(): Observable<auth.UserCredential> {
    return from(this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider()));
  }

  loginWithGithub(): Observable<auth.UserCredential> {
    return from(this.afAuth.auth.signInWithPopup(new auth.GithubAuthProvider()));
  }

  loginWithEmail(email: string, password: string): Observable<auth.UserCredential> {
    return from(this.afAuth.auth.signInWithEmailAndPassword(email, password));
  }

  register(email: string, password: string): Observable<auth.UserCredential> {
    return from(this.afAuth.auth.createUserWithEmailAndPassword(email, password));
  }

  logout(): Observable<void> {
    return from(this.afAuth.auth.signOut());
  }
}
