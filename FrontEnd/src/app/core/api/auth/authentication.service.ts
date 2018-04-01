import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { JwtService } from './jwt.service';
import {Observable} from "rxjs/Observable";

@Injectable()
export class AuthenticationService {

  private currentUser: any;
  private isAuthenticated: boolean;

  private readonly resourceUrl: string = '/users';

  //-----------------------------------------------------------------------------//

  register(user) {

    return this.apiService.post(`${this.resourceUrl}/register`, user)
      .map(user => user);
  }

  //-----------------------------------------------------------------------------//

  login(credentials) {

    return this.apiService.post(`${this.resourceUrl}/authenticate`, credentials)
      .map(res => {
        if (res.success){
          console.log('pula1')
          this.jwtService.saveToken(res.token); //TODO: complete after backend refactor
          this.setAuth(res.user);
          return res.user;
        }
        else {
          console.log('pula2')
          throw 'plm'
        }

      });
  }

  //-----------------------------------------------------------------------------//

  logout() {
    this.jwtService.destroyToken();
    this.currentUser = null;
    this.isAuthenticated = false;
  }

  //-----------------------------------------------------------------------------//

  setAuth(user) {
    this.currentUser = user;
    this.isAuthenticated = true;
  }

  //-----------------------------------------------------------------------------//

  isLoggedIn() {
    return this.isAuthenticated;
  }

  //-----------------------------------------------------------------------------//

  constructor(
    private apiService: ApiService,
    private jwtService: JwtService
  ) { }

}
