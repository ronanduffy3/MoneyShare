import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { Router } from '@angular/router';

import firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<User>;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
   }

   updateUsername(username: string) {

    let data = {};
    data[username] = this.user$.subscribe(d => d.uid);

    this.afs.doc(`/users/${this.user$.subscribe(d => d.uid)}`).update({'username': username});
    this.afs.doc(`/usernames`).update(data);
  }


   SignUp(email, password, username) {
    return this.afAuth.createUserWithEmailAndPassword(email, password)
    .then((result) => {
      /* Call the SendVerificaitonMail() function when new user sign
      up and returns promise */
      this.updateUsername(username);
      this.SendVerificationMail();
      this.SetUserData(result.user);

    }).catch((error) => {
      window.alert(error.message);
    });
   }

   SetUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`Users/${user.uid}`);
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      emailVerified: user.emailVerified,
      username: user.username,
      roles: {
        subscriber: false
      }
    };
    return userRef.set(userData, {
      merge: true
    });
  }

  async SendVerificationMail() {
    (await this.afAuth.currentUser).sendEmailVerification().then(() => {
      console.log('Email Sent');
      this.router.navigate(['send-verification-email']);
    });
  }


}
