import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

@Injectable()
export class SearchService {

  constructor(private http:Http) { }

  grabTags()
  {
    let retObj = Array();
    let headers=new Headers();
    headers.append('Content-Type','application/json');

    return this.http.post('http://localhost:8000/routes/search',{type:'reqTags'},{headers:headers}).map(res=>res.json());

  }

}
