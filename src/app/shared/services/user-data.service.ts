import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { BehaviorSubject, Subject } from 'rxjs';
import { retry, take } from 'rxjs/operators';
import { User } from '../interfaces/user';


@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  constructor(private afAuth: AngularFireAuth) { }
  private userData = new Subject<User>();
  public userData$ = this.userData.asObservable();

  getUserData(): void {
    this.afAuth.user.toPromise().then((user) => {
      user = user;
      if (user) {
        const userObject = {
          uid: user?.uid,
          displayName: user?.displayName,
          email: user?.email,
          emailVerified: user?.emailVerified
        };
        if (userObject) {
          take(1);
          console.log(user?.providerData.toString());
          return this.userData.next(userObject);
         }
      } else {
        const userObject =  {};
        this.userData.next(userObject);
        this.userData.unsubscribe();
      }
    });
}
}
