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
import { GuestGuardService } from './guest-guard.service';
import { MyPageComponent } from './my-page/my-page.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  // { path: '/', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },

  //User Routes
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [GuestGuardService],
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [GuestGuardService],
  },

  {
    path: 'gallery',
    component: GalleryComponent,
  },
  {
    path: 'gallery/:postId',

    component: DetailsComponent,
    pathMatch: 'full',
  },
  //Create page
  {
    path: 'create',
    component: CreateComponent,
    canActivate: [AuthGuardService],
  },
  //Edit page
  {
    //add the owner-guard service
    path: 'gallery/:pageId/edit',
    component: EditComponent,
    canActivate: [AuthGuardService],
    pathMatch: 'full',

    //TODO implement owner guard
  },
  //my  Page
  {
    path: 'myPage',
    component: MyPageComponent,
    canActivate: [AuthGuardService],
  },

  {
    path: 'myPage/:pageId',
    redirectTo: '/gallery/:pageId',
    pathMatch: 'full',
  },
  {
    path: 'home/:pageId',
    redirectTo: 'gallery/:pageId',
    pathMatch: 'full',
  },
  //redirect any random url to Page not found
  { path: '**', component: NotFoundComponent },
];
