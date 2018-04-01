//Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//Modules
import { ViewsRoutingModule } from './views-routes.module';

//Components
import { RootComponent } from './_root/root.component';

@NgModule({
  imports: [
    CommonModule,

    ViewsRoutingModule,
  ],
  declarations: [
    RootComponent
  ],
  exports: [

    ViewsRoutingModule,
  ]
})

export class ViewsModule { }
