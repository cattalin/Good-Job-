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


import { NavbarComponent } from './components/navbar/navbar.component';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { AuthGuard } from './guards/auth.guard';

import { ValidateService } from './services/validate.service'; 
import { AuthenticateService } from './services/authenticate.service';
import { CheckVideoService } from './services/check-video.service';
import { SubmitVideoService } from './services/submit-video.service';
import { VideoFeedService } from './services/videofeed/video-feed.service';
import { SubmitVideoComponent } from './components/submit-video/submit-video.component';

const appRoutes: Routes =  [
  {path:'', component: FeedComponent, canActivate:[AuthGuard]},
  {path:'register', component: RegisterComponent},
  {path:'login', component: LoginComponent},
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
    SubmitVideoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    FlashMessagesModule
  ],
  providers: [VideoFeedService, AuthenticateService, AuthGuard, ValidateService, 
  CheckVideoService, SubmitVideoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
