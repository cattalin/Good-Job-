import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { URLSearchParams, RequestOptions } from '@angular/http';
import { ViewProfileComponent } from '../components/view-profile/view-profile.component';
import { prepEndpoint } from './server-connection.service';
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

  followUser(followerId:String, followedId:String){//not auto tested
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let ep = prepEndpoint('routes/follow');
    return this.http.post(ep, {followerId, followedId}, { headers: headers })
      .map(res => res.json());
  }

   getListOfFollowings(followerId: any) {
    let options = new RequestOptions({ headers: new Headers({ 'Content-Type': 'application/json' }) });
    let headers = new Headers();
    let params: URLSearchParams = new URLSearchParams();
    params.set("followerId", followerId);
    options.search = params;
    let ep = prepEndpoint('routes/listOfFollowings');
    return this.http.get(ep, options).map(res => {
      let data = res.json();
      if (data) {
        return data;
      } else console.log('Error');
    }, err => {
      console.log('error');
    });
  }

  getNumberOfFollowers(followedId: any) {
    let options = new RequestOptions({ headers: new Headers({ 'Content-Type': 'application/json' }) });
    let headers = new Headers();
    let params: URLSearchParams = new URLSearchParams();
    params.set("followedId", followedId);
    options.search = params;
    let ep = prepEndpoint('routes/numberOfFollowers');
    return this.http.get(ep, options).map(res => {
      let data = res.json();
      if (data) {
        return data;
      } else console.log('Error');
    }, err => {
      console.log('error');
    });
  }

  getProfile(username: any) {

    let options = new RequestOptions({ headers: new Headers({ 'Content-Type': 'application/json' }) });
    let headers = new Headers();
    let params: URLSearchParams = new URLSearchParams();
    params.set("username", username);
    options.search = params;
    let ep = prepEndpoint('routes/userprofile');
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
    let ep = prepEndpoint('routes/userprofilebyemail');
    return this.http.get(ep, options).map(res => {
      let data = res.json();
      if (data.success) {
        return data;
      } else console.log('User not found.');
    }, err => {
      console.log('error');
    });
  }
}
