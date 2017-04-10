import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

@Injectable()
export class UserProfileService {

  constructor(private http: Http) { }

  getProfile(username) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let ep = this.prepEndpoint('routes/profile');
    return this.http.get(ep, { headers: headers })
      .map(res => res.json());
  }

  prepEndpoint(ep) {
    return 'http://localhost:8000/' + ep;
  }

}
