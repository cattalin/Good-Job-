import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { AuthHttp, AuthConfig } from 'angular2-jwt';

import { AppComponent } from './app.component';
import { VideoComponent } from './components/video/video.component';
import { AuthGuard } from './guards/auth.guard';

// --WIP--Sebi
import { SearchComponent } from './components/search/search.component';
import { SearchService } from './services/search.service';
// --ENDWIP--Sebi

import { NavbarComponent } from './components/navbar/navbar.component';
import { FlashMessagesModule } from 'angular2-flash-messages';


import { ValidateService } from './services/validate.service';
import { AuthenticateService } from './services/authenticate.service';
import { VideoFeedService } from './services/videofeed/video-feed.service';
import { CheckVideoService } from './services/check-video.service';
import { SubmitVideoService } from './services/submit-video.service';
import { CheckclassService} from './services/checkclass.service';
import { ViewProfileComponent } from './components/view-profile/view-profile.component';
import { UserProfileService } from './services/user-profile.service';
import { CommentComponent } from './components/comment/comment.component';
import { CommentFeedComponent } from './components/comment-feed/comment-feed.component';
import { CommentSubmitComponent } from './components/comment-submit/comment-submit.component';
import { VideoFeedComponent } from './components/video-feed/video-feed.component';
import { VideoSubmitComponent } from './components/video-submit/video-submit.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { UserRegisterComponent } from './components/user-register/user-register.component';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { VideoSearchResultsComponent } from './components/video-search-results/video-search-results.component';
import { VideoFeedPaginationComponent } from './COmponents/video-feed-pagination/video-feed-pagination.component';


//--------------------------------------------------------------------//
// import { ViewsModule } from './views/views.module';

const appRoutes: Routes = [
  { path: '', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'register', component: UserRegisterComponent },
  { path: 'login', component: UserLoginComponent },
  { path: 'profile', component: UserProfileComponent, canActivate: [AuthGuard] },
  { path: 'upload', component: VideoSubmitComponent, canActivate: [AuthGuard] },
  { path: 'search', component: VideoSearchResultsComponent},
  { path: 'user-profile', component: ViewProfileComponent, canActivate: [AuthGuard]}
]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    VideoComponent,
    SearchComponent,
    ViewProfileComponent,
    CommentComponent,
    CommentFeedComponent,
    CommentSubmitComponent,
    VideoFeedComponent,
    VideoSubmitComponent,
    UserProfileComponent,
    UserRegisterComponent,
    UserLoginComponent,
    DashboardComponent,
    VideoSearchResultsComponent,
    VideoFeedPaginationComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    FlashMessagesModule,
    ReactiveFormsModule,

    // ViewsModule
  ],
  providers: [VideoFeedService, AuthenticateService, AuthGuard, ValidateService, SearchService,
    CheckVideoService, SubmitVideoService, UserProfileService, CheckclassService],
  bootstrap: [AppComponent]
})
export class AppModule { }
