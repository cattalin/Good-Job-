//Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlashMessagesModule } from 'angular2-flash-messages';

//Modules
import { ViewsRoutingModule } from './views-routes.module';
import { ComponentsModule } from '../components/components.module';
import { CoreModule } from 'app/core/core.module';

//Components
import { RootComponent } from './_root/root.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

@NgModule({
  imports: [
    CommonModule,
    FlashMessagesModule,

    ComponentsModule,
    CoreModule,
    ViewsRoutingModule,
  ],
  declarations: [
    RootComponent,
    UserProfileComponent
  ],
  exports: [
    ViewsRoutingModule,
  ]
})
export class ViewsModule { }
