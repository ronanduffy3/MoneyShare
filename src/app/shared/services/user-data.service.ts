import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  constructor(private afAuth: AngularFireAuth) { }
  private userData = new BehaviorSubject<any>([]);
  public userData$ = this.userData.asObservable();

  getUserData(): void {
    this.afAuth.user.subscribe((user) => {
      user = user;
      if (user) {
        const userObject = {
          userId: user?.uid,
          displayName: user?.displayName,
          email: user?.email,
        };
        this.userData.next(userObject);
      } else {
        const userObject = null;
        this.userData.next(userObject);
      }
}
