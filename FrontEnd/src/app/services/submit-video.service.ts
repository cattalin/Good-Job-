import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { prepEndpoint } from './server-connection.service';


@Injectable()
export class SubmitVideoService {

  constructor(private http:Http) {}
  
  submitVideo(videoInformation){
    let headers=new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post(ep,videoInformation,
    {headers:headers}).map(res=>res.json());
  }

  submitComment(commentInformation) {
      let headers=new Headers();
      headers.append('Content-Type','application/json');
      return this.http.post(ep,commentInformation,
      {headers:headers}).map(res=>res.json());
  }

  remove(id) {
     let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let ep = prepEndpoint('routes/deletecomm');
    return this.http.post(ep, id, { headers: headers })
      .map(res => res.json());
  }

}
