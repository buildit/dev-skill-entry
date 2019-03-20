import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  usersRef;

  constructor(private afs: AngularFirestore) {
    this.usersRef = this.afs.collection('users');
  }

  setSkills(uid, skillSet) {
    return this.usersRef.doc(uid).update({skillSet});
  }

  getSkills(uid) {
    return this.usersRef.doc(uid).get();
  }

  setUser(userInfo) {
    return this.usersRef.doc(userInfo.uid).set({userInfo});
  }

  getUser(userInfo) {
    return this.usersRef.doc(userInfo.uid).get();
  }
}
