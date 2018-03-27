import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class ApiService {

    private readonly apiUrl = '/routes'; //TODO:

    //-----------------------------------------------------------------------------//

    delete(path):Observable<any> {
        return this.http.delete(`${this.apiUrl}${path}`, {headers: this.setHeaders()})
            .catch(err => this.errorHandler(err)
        );
    } 

    //-----------------------------------------------------------------------------//

    post(path: string, body: Object = {}): Observable<any> {
        return this.http.post(`${this.apiUrl}${path}`, JSON.stringify(body), {headers: this.setHeaders()})
            .catch(err => this.errorHandler(err)
        );
    }

    //-----------------------------------------------------------------------------//

    put(path: string, body: Object = {}): Observable<any> {
        return this.http.put(`${this.apiUrl}${path}`, JSON.stringify(body), {headers: this.setHeaders()})
            .catch(err => this.errorHandler(err)
        );
    }    

    //-----------------------------------------------------------------------------//

    get(path: string, params={}): Observable<any> {
        return this.http.get(`${this.apiUrl}${path}`, {headers: this.setHeaders(), params: params})
            .catch(err => this.errorHandler(err)
        );
    }

    //-----------------------------------------------------------------------------//

    private setHeaders() {
        const headers = {};
        headers['Content-Type'] = 'application/json';
        return headers;
    }

    //-----------------------------------------------------------------------------// 

    private errorHandler(error: any) {
        return Observable.throw(error);
    }

    //-----------------------------------------------------------------------------//

    constructor(private http: HttpClient) {}

}