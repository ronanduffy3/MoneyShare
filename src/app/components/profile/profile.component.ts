import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { LoginStateService } from 'src/app/shared/services/login-state.service';
import { UserDataService } from 'src/app/shared/services/user-data.service';
import { User } from '../../shared/interfaces/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(public uds: UserDataService, public router: Router, public stateService: LoginStateService, public auth: AuthService) { }

  isLoggedIn: boolean;
  publicUser: any;

  ngOnInit(): void {
    this.setLoggedInState();
    this.setUser();
    console.log(this.isLoggedIn);
  }

  setLoggedInState(): void {
    const isLoggedin = this.stateService.isLoggedIn$.toPromise().then((result) => {
      if (result) {
        return true;
      } else {
        return false;
      }
    });
    if (isLoggedin) {
      this.isLoggedIn = true;
    } else {
      this.isLoggedIn = false;
    }

  }

  async setUser(): Promise<void> {
    this.uds.userData$.toPromise().then((result: User) => {
      if (result === null || 'unknown' || 'undefined') {
        console.log('The user is null');
        this.router.navigateByUrl('/login');
      } else {
        this.publicUser = result;
        console.log('Logging the result');
        return this.publicUser;
      }
  });
  }
}
