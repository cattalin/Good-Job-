import { TestBed, inject ,async} from '@angular/core/testing';
import { Response,HttpModule, Http, ResponseOptions, XHRBackend,RequestOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { SubmitVideoService } from './submit-video.service';

describe('SubmitVideoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
       imports: [HttpModule],
      providers:[ { provide: XHRBackend, useClass: MockBackend},SubmitVideoService] 
    });
  });

  it("should start",
    inject ( [XHRBackend,SubmitVideoService],(mockBackend,serv)=>{
      expect(serv).toBeTruthy();
    }));
});
