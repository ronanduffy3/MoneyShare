import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class LoginStateService {

  constructor(private auth: AngularFireAuth) { }

  private isLoggedIn = new Subject<boolean>();
  public isLoggedIn$ = this.isLoggedIn.asObservable();

  setUserStatus(): void {
    const authState$ = this.auth.authState.toPromise();
    if (authState$ === null || 'unknown' || 'undefined') {
        this.isLoggedIn.next(true);
      } else {
        this.isLoggedIn.next(false);
      }
    }

  signOut(): void {
    this.auth.signOut();
  }
}

