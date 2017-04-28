import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class AuthenticateService {
  authToken: any;
  user: any;
  isDev: boolean;

  constructor(private http: Http) {
    //this.isDev = true; // Change to false before deployment
  }

  registerUser(user) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let ep = this.prepEndpoint('routes/register');
    return this.http.post(ep, user, { headers: headers })
      .map(res => res.json());
  }

  updateUserName(user) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let ep = this.prepEndpoint('routes/updateName');
    return this.http.post(ep, user, { headers: headers })
      .map(res => res.json());
  }

  updateUserEmail(user) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let ep = this.prepEndpoint('routes/updateEmail');
    return this.http.post(ep, user, { headers: headers })
      .map(res => res.json());
  }

  updateUserPassword(user) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let ep = this.prepEndpoint('routes/updatePassword');
    return this.http.post(ep, user, { headers: headers })
      .map(res => res.json());
  }

  authenticateUser(user) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let ep = this.prepEndpoint('routes/authenticate');
    return this.http.post(ep, user, { headers: headers })
      .map(res => res.json());
  }

  getProfile() { 
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    let ep = this.prepEndpoint('routes/profile');
    return this.http.get(ep, { headers: headers })
      .map(res => res.json());
  }

  storeUserData(token, user) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  loggedIn() {
    return tokenNotExpired();
  }

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

  prepEndpoint(ep) {
    return 'http://localhost:8000/' + ep;
  }
}
