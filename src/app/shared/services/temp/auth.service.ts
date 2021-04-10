import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { Router, RouterEvent } from '@angular/router';

import firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import {AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { first } from 'rxjs/operators';

import { UserDataService } from '../services/user-data.service';
import { LoginStateService } from '../services/login-state.service';

import { Observable, of, Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
    private logIn: LoginStateService,
    private uds: UserDataService
  ) {}

  private user = new Subject<User>();
  public user$ = this.user.asObservable();

  // Method #1
  SignUp(email, password, username, displayname) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        console.log(result.user);
        this.SetUserData(result.user, username, displayname);
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  // Method #2
  async SendVerificationMail() {
    (await this.afAuth.currentUser).sendEmailVerification().then(() => {
      console.log('Email Sent');
      this.router.navigate(['send-verification-email']);
    });
  }

  // Method #3
  SetUserData(user, newUsername, displayname) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: displayname,
      emailVerified: user.emailVerified,
      username: newUsername,
      roles: {
        admin: false,
      },
    };
    this.updateUsername(newUsername, userData.uid);
    return userRef.set(userData, {
      merge: true,
    });
  }

  // Method #4
  updateUsername(username: string, uid: string) {
    // Create a data object, and then tie it together and push to a colection in the database this allows for no duplication
    const data = {};
    data[username] = uid;
    // Pushs to the collection
    this.afs.collection(`/usernames`).add(data);
  }

  // Method #5
  SignIn(email, password): Promise< void > {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        const user = result.user;
        this.setUser(user);
        this.router.navigate(['/profile']);
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  // Method #6
  setUser(user: any): void {
    this.logIn.setUserStatus();
    this.user.next(user);
  }

  // Method #7
  SignOut() {
    this.afAuth.signOut();
  }

  // Method #9
  async getUser() {
    return this.afAuth.authState.pipe(first()).toPromise();
  }

  // Method #10
  private checkRole(user: User, allowRoles: string[]): boolean {
    if (!user) {
      return false;
    }
    for (const role of allowRoles) {
      if (user.roles[role]) {
        return true;
      }
    }
    return false;
  }

  // Authorization Methods

  // Auth Method #1
  canRead(user: User): boolean {
    const allowed = ['admin', 'user'];
    return this.checkRole(user, allowed);
  }

  // Auth Method #2
  canEdit(user: User): boolean {
    const allowed = ['admin'];
    return this.checkRole(user, allowed);
  }

  // Auth Method #3
  canDelete(user: User): boolean {
    const allowed = ['admin'];
    return this.checkRole(user, allowed);
  }

}
