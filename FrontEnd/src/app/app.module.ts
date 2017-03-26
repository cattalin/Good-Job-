import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AddVideoComponent } from './add-video/add-video.component';
import { ListVideoComponent } from './list-video/list-video.component';
import { CommentBoxComponent } from './comment-box/comment-box.component';
import {CollectableVideos} from "./shared/collectable.service";


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    AddVideoComponent,
    ListVideoComponent,
    CommentBoxComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [CollectableVideos],
  bootstrap: [AppComponent]
})
export class AppModule { }
