import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { LoginStateService } from '../../shared/services/login-state.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public auth: AuthService, public stateService: LoginStateService, public router: Router) { }

  isLoggedin = false;

  ngOnInit(): void {
    this.setLoggedInState();
    console.log(this.isLoggedin);

  }

  SignOut() {
    this.auth.SignOut();
    this.router.navigate(['/home']);
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
      this.isLoggedin = true;
    } else {
      this.isLoggedin = false;
    }

  }


}
