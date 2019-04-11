import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {

  constructor(private afs: AngularFirestore) {}

  setSkills(uid: string, skillSet: {}): Promise<any> {
    return this.afs.collection('skill-set').doc(uid).set({skillSet}, {merge: true});
  }

  getSkills(uid: string): Observable<firebase.firestore.DocumentData> {
    return this.afs.collection('skill-set').doc(uid).get();
  }
}