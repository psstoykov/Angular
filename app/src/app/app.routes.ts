import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { CreateComponent } from './create/create.component';
import { AuthGuardService } from './auth-guard.service';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },

  //User Routes
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  //Create
  {
    path: 'create',
    component: CreateComponent,
    canActivate: [AuthGuardService],
  },
];
