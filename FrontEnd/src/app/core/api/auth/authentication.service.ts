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
      .map(res => {
        if(res.success) return res;
        else throw res.status;
      });
  }

  //-----------------------------------------------------------------------------//

  login(credentials) {

    return this.apiService.post(`${this.resourceUrl}/authenticate`, credentials)
      .map(res => {
        if (res.success){
          this.jwtService.saveToken(res.token);
          this.setAuth(res.user);
          return res.user;
        }
        else {

          if(res.code==400)
          {
            if(res.status=='invalid_user_data') throw 'There was an error. Please try again.';
            if(res.status=='invalid_password' || res.status=='wrong_password') throw 'Invalid password.';
          }
          else if(res.code==404)
          {
            if(res.status=='user_not_found') throw 'User not found.'
          }
          else
          {
            throw res.status;
          }
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
