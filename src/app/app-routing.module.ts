import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DepositComponent } from './components/deposit/deposit.component';
import { AngularFireAuthGuard, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { ProfileComponent } from './components/profile/profile.component';
import { ContactComponent } from './components/contact/contact.component';
import { AdminComponent } from './components/admin/admin.component';
<<<<<<< HEAD
import { AdminGuard } from './shared/guards/admin.guard';
=======
>>>>>>> c57cf1dae7839609b006f6d2d96482f6eea5bf0b


const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'deposit', component: DepositComponent, canActivate: [AngularFireAuthGuard],
  data: { authGuardPipe: redirectUnauthorizedToLogin }},
  {path: 'profile', component: ProfileComponent, canActivate: [AngularFireAuthGuard],
  data: { authGuardPipe: redirectUnauthorizedToLogin }},
  {path: 'ticket', component: ContactComponent, canActivate: [AngularFireAuthGuard],
  data: { authGuardPipe: redirectUnauthorizedToLogin }},
<<<<<<< HEAD
  {path: 'admin', component: AdminComponent, canActivate: [AdminGuard],
=======
  {path: 'admin', component: AdminComponent, canActivate: [AngularFireAuthGuard],
>>>>>>> c57cf1dae7839609b006f6d2d96482f6eea5bf0b
  data: { authGuardPipe: redirectUnauthorizedToLogin }},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


export class AppRoutingModule { }
