// Angular
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

// Modules
import { ComponentsModule } from 'app/components/components.module';
import { CoreModule } from 'app/core/core.module';

// Components

//Routing
import { VideosRoutingModule } from './videos-routing.module';

@NgModule({
  imports: [
    CommonModule,
    ComponentsModule,
    // CoreModule,
    FormsModule,
    VideosRoutingModule,
  ],
  declarations: [

  ]
})
export class VideosModule { }
