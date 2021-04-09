import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserDataService } from 'src/app/shared/services/user-data.service';
import { User } from '../../shared/interfaces/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(public uds: UserDataService, public router: Router) { }

  publicUser: any;

  ngOnInit(): void {
    this.setUser();
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
