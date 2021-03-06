import { Injectable } from '@angular/core';

import { ApiService } from '../api.service';
import { JwtService } from './jwt.service';

@Injectable()
export class AuthenticationService {

  private currentUser: any;
  private isAuthenticated: boolean;

  private readonly resourceUrl: string = ''; //TODO: change after backend refactor if needed

  //-----------------------------------------------------------------------------//

  register(user) {

    return this.apiService.post(`${this.resourceUrl}/register`, user)
      .map(user => user);
  }

  //-----------------------------------------------------------------------------//

  login(credentials) {

    return this.apiService.post(`${this.resourceUrl}/authenticate`, credentials)
      .map(res => {
        this.jwtService.saveToken(res.token); //TODO: complete after backend refactor
        this.setAuth(res.user);
        return res.user;
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

  constructor(
    private apiService: ApiService,
    private jwtService: JwtService
  ) { }

}
