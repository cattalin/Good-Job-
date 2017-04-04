import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';
import { FeedComponent } from './components/feed/feed.component';
import { VideoComponent } from './components/video/video.component';
import { SubmitVideoComponent } from './components/submit-video/submit-video.component';


import { AuthGuard } from './guards/auth.guard';

// --WIP--Sebi
import { SearchComponent } from './components/search/search.component';
import {SearchService} from './services/search.service';
// --ENDWIP--Sebi

import { NavbarComponent } from './components/navbar/navbar.component';
import { FlashMessagesModule } from 'angular2-flash-messages';


import { ValidateService } from './services/validate.service';
import { AuthenticateService } from './services/authenticate.service';
import { VideoFeedService } from './services/videofeed/video-feed.service';
import { CheckVideoService } from './services/check-video.service';
import { SubmitVideoService } from './services/submit-video.service';

const appRoutes: Routes =  [
  {path:'', component: FeedComponent, canActivate:[AuthGuard]},
  {path:'register', component: RegisterComponent},
  {path:'login', component: LoginComponent},
  //{path:'search',component: SearchComponent} -- Ignorati, Sebi nu stie sa adauge componenta la index :)
  {path:'profile', component: ProfileComponent, canActivate:[AuthGuard]},
  {path:'upload', component: SubmitVideoComponent, canActivate:[AuthGuard]}
]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    FeedComponent,
    VideoComponent,
    SubmitVideoComponent, 
    SearchComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    FlashMessagesModule
  ],
  providers: [VideoFeedService, AuthenticateService, AuthGuard, ValidateService, SearchService,
    CheckVideoService, SubmitVideoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
