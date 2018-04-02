// Angular
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { FlashMessagesModule } from 'angular2-flash-messages';


// Modules
import { ComponentsModule } from 'app/components/components.module';
import { CoreModule } from 'app/core/core.module';

// Components
import { UserProfileComponent } from './user-profile/user-profile.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';

//Routing
import { UsersRoutingModule } from './users-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FlashMessagesModule,

    ComponentsModule,
    CoreModule,
    UsersRoutingModule,
  ],
  declarations: [
    LoginComponent,
    RegisterComponent,
    UserProfileComponent
  ]
})
export class UsersModule { }
