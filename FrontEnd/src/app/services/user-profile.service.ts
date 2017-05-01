import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { URLSearchParams, RequestOptions } from '@angular/http';
import { ViewProfileComponent } from '../components/view-profile/view-profile.component';

import 'rxjs/add/operator/map';

@Injectable()
export class UserProfileService {

  username: String;

  constructor(private http: Http) { }

  setUsername(username: String) {
    this.username = username;
  }

  getUsername() {
    return this.username;
  }

  followUser(followerId:String, followedId:String){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let ep = this.prepEndpoint('routes/follow');
    return this.http.post(ep, {followerId, followedId}, { headers: headers })
      .map(res => res.json());
  }

  getProfile(username: any) {

    let options = new RequestOptions({ headers: new Headers({ 'Content-Type': 'application/json' }) });
    let headers = new Headers();
    let params: URLSearchParams = new URLSearchParams();
    params.set("username", username);
    options.search = params;
    let ep = this.prepEndpoint('routes/userprofile');
    return this.http.get(ep, options).map(res => {
      let data = res.json();
      if (data.success) {
        return data;
      } else console.log('User not found.');
    }, err => {
      console.log('error');
    });
  }

  getProfileByEmail(email: any) {

    let options = new RequestOptions({ headers: new Headers({ 'Content-Type': 'application/json' }) });
    let headers = new Headers();
    let params: URLSearchParams = new URLSearchParams();
    params.set("email", email);
    options.search = params;
    let ep = this.prepEndpoint('routes/userprofilebyemail');
    return this.http.get(ep, options).map(res => {
      let data = res.json();
      if (data.success) {
        return data;
      } else console.log('User not found.');
    }, err => {
      console.log('error');
    });
  }

  prepEndpoint(ep) {
    return 'http://localhost:8000/' + ep;
  }

}
