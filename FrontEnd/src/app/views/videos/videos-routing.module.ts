//Angular
import { NgModule } from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

//Resolvers

//Guards
import { AuthGuard } from 'app/core';

//Components
import { FeedComponent } from "./feed/feed.component";
import { UploadComponent } from './upload/upload.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: FeedComponent
      },
      {
        path: 'upload',
        component: UploadComponent
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class VideosRoutingModule { }
