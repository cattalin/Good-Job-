//Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlashMessagesModule } from 'angular2-flash-messages';

//Modules
import { ViewsRoutingModule } from './views-routing.module';
import { ComponentsModule } from '../components/components.module';
import { CoreModule } from 'app/core/core.module';

//Components
import { NavbarComponent } from '../components/navbar/navbar.component';
import { RootComponent } from './_root/root.component';

@NgModule({
  imports: [
    CommonModule,
    FlashMessagesModule,

    ComponentsModule,
    CoreModule,
    ViewsRoutingModule,
  ],
  declarations: [
    NavbarComponent,
    RootComponent
  ],
  exports: [
    ViewsRoutingModule,
  ]
})
export class ViewsModule { }
