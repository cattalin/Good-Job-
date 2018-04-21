// Angular
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { FlashMessagesModule } from 'angular2-flash-messages';

// Modules
import { ComponentsModule } from 'app/components/components.module';
import { CoreModule } from 'app/core/core.module';

// Components
import { FeedComponent } from './feed/feed.component';
import { UploadComponent } from './upload/upload.component';

//Routing
import { VideosRoutingModule } from './videos-routing.module';

@NgModule({
  imports: [
    CommonModule,
    ComponentsModule,

    FlashMessagesModule,
    // CoreModule,
    FormsModule,
    VideosRoutingModule,
  ],
  declarations: [
    FeedComponent,
    UploadComponent
  ]
})
export class VideosModule { }
