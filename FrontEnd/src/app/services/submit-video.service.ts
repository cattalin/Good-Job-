import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
@Injectable()
export class SubmitVideoService {

  constructor(private http:Http) {}
  
  submitVideo(videoInformation){
    let headers=new Headers();
    headers.append('Content-Type','aplication/json');
    return this.http.post('http://localhost:8000/upload',videoInformation,{headers:headers}).map(res=>res.json);
  }

}
