//Angular
import { NgModule } from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

//Resolvers

//Guards
import { AuthGuard } from 'app/core/guards/auth.guard';

//Components
import { UserProfileComponent } from './user-profile/user-profile.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: '',
    children: [

      {
        path: 'profile',
        canActivate: [AuthGuard],
        component: UserProfileComponent
      },
      {
        path: 'profile/:username',
        canActivate: [AuthGuard],
        component: UserProfileComponent
      },
      {
        path: 'register',
        component: RegisterComponent
      },
      {
        path: 'login',
        component: LoginComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class UsersRoutingModule { }
