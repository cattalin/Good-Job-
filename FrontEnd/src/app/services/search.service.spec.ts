import { TestBed, inject ,async} from '@angular/core/testing';
import { Response,HttpModule, Http, ResponseOptions, XHRBackend } from '@angular/http';
import { SearchService } from './search.service';
import { MockBackend } from '@angular/http/testing';

describe('SearchService', () => {
 
  beforeEach(()=>{
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers:[ { provide: XHRBackend, useClass: MockBackend},SearchService] 
    });
  });
  it("should start",
    inject ( [XHRBackend,SearchService],(mockBackend,serv)=>{
      expect(serv).toBeTruthy();
    }));
});
