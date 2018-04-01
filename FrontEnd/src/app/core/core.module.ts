import { NgModule } from '@angular/core';

import {
  ApiService,
  AuthenticationService,
  JwtService,
  UserService ,
} from './api';

@NgModule({
    imports: [

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
