//Angular
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// Components
import { SearchComponent } from './search/search.component';
import { SafePipe, VideoComponent } from './video/video.component';
import { PaginationComponent } from './pagination/pagination.component';
import { CommentComponent } from './comment/comment.component';
import { CommentFeedComponent } from './comment-feed/comment-feed.component';
import { NewCommentComponent } from './comment-new/new-comment.component';
import { FeedComponent } from '../views/videos/feed/feed.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  declarations: [
    SafePipe,
    SearchComponent,
    VideoComponent,
    PaginationComponent,
    CommentComponent,
    CommentFeedComponent,
    NewCommentComponent,
    FeedComponent
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,

    SearchComponent,
    VideoComponent,
    PaginationComponent,
    CommentComponent,
    CommentFeedComponent,
    NewCommentComponent,
    FeedComponent
  ],
  providers: [],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class ComponentsModule {
  cosntructor(){
    console.warn('Constructing ComponentsModule');
  }
}
