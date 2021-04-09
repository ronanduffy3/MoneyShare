import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { LoginStateService } from '../../shared/services/login-state.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public auth: AuthService, public stateService: LoginStateService) { }

  ngOnInit(): void {
  }

  SignOut() {
    this.auth.SignOut();
  }


}
