// Angular
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Modules
import { CoreModule } from '../core/core.module';

//Guards
// import { AuthGuard } from 'app/core';

//Components
import { RootComponent } from './_root/root.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

const appRoutes: Routes = [{
  path: '',
  component: RootComponent,
  children: [
    {
      path: 'user-profile',
      component: UserProfileComponent
    }
  ]
},{
  path: '**',
  redirectTo: '/',
  pathMatch: 'full'
}];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes),
    CoreModule
  ],
  exports: [
    RouterModule
  ],
  providers: [

  ]
})
export class ViewsRoutingModule { }
