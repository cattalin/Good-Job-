import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';
import { URLSearchParams, RequestOptions } from '@angular/http';
@Injectable()
export class CheckclassService {

  constructor(private http:Http) { }
  getClassUpdate(query: any){
    let options = new RequestOptions({headers: new Headers({'Content-Type': 'application/json'})});
    let headers = new Headers();
    let params: URLSearchParams = new URLSearchParams();
    for (let key in query){
      params.set(key.toString(), query[key]);
    }
    options.search = params;
    let ep = this.prepEndpoint('routes/updateClass');
    return this.http.get(ep,options).map(res=>res.json())}
      //console.log(data);
      // if(data.success){
      //   console.log(data+" "+data.result.oldClass.indexOf(data.result.newClass));
      //   if(!(data.result.oldClass.indexOf(data.result.newClass)>-1))
      //     return data.result.oldClass.concat(data.result.newClass);
      //   else return "X";
      // }
      // else {
      //   console.log("FFS");
      // }
    

  private prepEndpoint(ep){
    return 'http://localhost:8000/'+ep;
  }
}
