import { TestBed, inject ,async} from '@angular/core/testing';
import { Response,HttpModule, Http, ResponseOptions, XHRBackend } from '@angular/http';
import {  CheckclassService } from './checkclass.service';
import { MockBackend } from '@angular/http/testing';
describe('CheckclassService', () => {
  
  beforeEach(()=>{
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers:[ { provide: XHRBackend, useClass: MockBackend}, CheckclassService] 
    });
  });
   it("should initialize",
    inject ( [XHRBackend, CheckclassService],(mockBackend,serv)=>{
    expect(serv).toBeTruthy();
  }));
  it("should return a good set of rules",
    inject ( [XHRBackend, CheckclassService],(mockBackend,serv)=>{
    let ProfileResponseCorect={
         oldClass : "B" , 
         newClass : "C" ,
         progress:{
          nrOfVideos: 2,
          nrOfFollowers: 2,
          nrOfGoodVids: 1,
          nrOfDecentVids: 2,
          rateOfDecentVideos:0,
          nrOfVotes:4,
          _class:"C"
          },
        goal:{
          nrOfVideos: 3,//change to 32
          nrOfFollowers: 3,//change to 100
          nrOfGoodVids: 2,//change to 15
          nrOfDecentVids: 2,//change to 30
          rateOfDecentVideos:0,//change to 0.5
          nrOfVotes:7,
          nameOfnextRank:'E',
          nameOfpreviosRank:'C',
          nameInDatabase:'D'
        }
    };
    mockBackend.connections.subscribe((connection) => {
          connection.mockRespond(new Response(new ResponseOptions({
            body: JSON.stringify(ProfileResponseCorect)
          })));
    });
    serv.getClassUpdate("some query").subscribe((raspuns)=>{
      expect(raspuns.oldClass).toEqual("B");
      expect(raspuns.newClass).toEqual("C");
      expect(raspuns.progress.nrOfVideos).toEqual(raspuns.goal.nrOfVideos-1);
      expect(raspuns.progress.nrOfFollowers).toEqual(raspuns.goal.nrOfFollowers-1);
      expect(raspuns.progress.nrOfGoodVids).toEqual(raspuns.goal.nrOfGoodVids -1);
      expect(raspuns.progress.nrOfDecentVids).toEqual(raspuns.goal.nrOfDecentVids);
      expect(raspuns.progress.rateOfDecentVideos).toEqual(raspuns.goal.rateOfDecentVideos);
      expect(raspuns.progress.nrOfVotes).toEqual(raspuns.goal.nrOfVotes-3);
    })
  }));
});   
 