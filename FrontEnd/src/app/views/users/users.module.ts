// Angular
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

// Modules
import { ComponentsModule } from 'app/components/components.module';
import { CoreModule } from 'app/core/core.module';

// Components

//Routing
import { UsersRoutingModule } from './users-routing.module';

@NgModule({
  imports: [
    CommonModule,
    ComponentsModule,
    CoreModule,
    FormsModule,
    UsersRoutingModule,
  ],
  declarations: [

  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class UsersModule { }
