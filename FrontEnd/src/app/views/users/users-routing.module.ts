//Angular
import { NgModule } from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

//Resolvers

//Guards
// import { AuthGuard } from 'app/core';

//Components

const routes: Routes = [
  {
    path: '',
    redirectTo: '/',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class UsersRoutingModule { }
