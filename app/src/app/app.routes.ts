import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { CreateComponent } from './create/create.component';
import { AuthGuardService } from './auth-guard.service';
import { GalleryComponent } from './gallery/gallery.component';
import { DetailsComponent } from './details/details.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { EditComponent } from './edit/edit.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },

  //User Routes
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  {
    path: 'gallery',
    component: GalleryComponent,
  },
  //Create page
  {
    path: 'create',
    component: CreateComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'gallery/:postId',

    component: DetailsComponent,
    children: [
      {
        path: 'edit',
        component: EditComponent,
      },
    ],
  },

  //redirect any random url back to home page
  { path: '**', component: NotFoundComponent },
];
