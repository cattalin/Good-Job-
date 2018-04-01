import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import {
  ApiService,
  AuthenticationService,
  JwtService,
  UserService ,
} from './api';

@NgModule({
    imports: [
      CommonModule,
      HttpClientModule
    ],
    providers: [
        ApiService,
        AuthenticationService,
        JwtService,
        UserService,
    ]
})
export class CoreModule {

}
