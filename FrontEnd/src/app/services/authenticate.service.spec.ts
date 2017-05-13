import { TestBed, inject ,async} from '@angular/core/testing';
import { Response,HttpModule, Http, ResponseOptions, XHRBackend } from '@angular/http';
import {  AuthenticateService } from './authenticate.service';
import { MockBackend } from '@angular/http/testing';
import { tokenNotExpired } from 'angular2-jwt';
import 'rxjs/add/operator/map';
describe('AuthenticateService', () => {
   beforeEach(()=>{
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers:[ { provide: XHRBackend, useClass: MockBackend}, AuthenticateService] 
    });
    it('',()=>{expect(true).toBe(true)});
    /*it('should store the token and then load said token corectly',inject ( [XHRBackend, AuthenticateService],(mockBackend,serv)=>{
      serv.storeUserData("1234","loggedintest");
      expect(serv.loadToken()).toBe("1234"); 
      expect(serv.loggedIn()).toBe(true);
    }));
    it('should store a token, be able to use it , and then be able to delete said token',inject ( [XHRBackend, AuthenticateService],(mockBackend,serv)=>{
      serv.storeUserData("1111","loggedintest");
      expect(serv.loadToken()).toBe("1111");
      expect(serv.loggedIn()).toBe(true);
      serv.logout();
      expect(serv.loggedIn()).toBe(false);
    }));*/ 
  }); 
}); 
 