import { TestBed, inject ,async} from '@angular/core/testing';
import { Response,HttpModule, Http, ResponseOptions, XHRBackend } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { VideoFeedService } from './video-feed.service';

describe('VideoFeedService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers:[ { provide: XHRBackend, useClass: MockBackend}, VideoFeedService]
    });
  });

  it('should initialise',  inject ( [XHRBackend, VideoFeedService],(mockBackend,serv) => {
    expect(serv).toBeTruthy();
  }));

   it('should extract the date corectly start', inject ( [XHRBackend, VideoFeedService],(mockBackend,serv) => {
    expect(serv.dateFromObjectId("5915c2fc62e64f2f84c9071d")+"").toBe("Fri May 12 2017 17:13:16 GMT+0300 (GTB Daylight Time)");
  }));
  it('should select and return a list of comments',inject ( [XHRBackend, VideoFeedService],(mockBackend,serv) =>{
    let dudcoments={
      success: true,
      comments: [
              { _id: 1,
                text: "12221",
                userId: "1",
                videoId: "1",
                username: "test"
              },
              { _id: 2,
                text: "actual nonretarded comment",
                userId: "1",
                videoId: "1",
                username: "test"
              },
              { _id: 3,
                text: "so much spam here",
                userId: "2",
                videoId: "1",
                username: "asas"
              },
      ]
    };
    mockBackend.connections.subscribe((connection) => {
          connection.mockRespond(new Response(new ResponseOptions({
            body: JSON.stringify(dudcoments)
          })));
      });
    serv.getComments("test").subscribe((rezultat)=>{
      let data=rezultat;
      //expect(data).toBe(true);
      expect(data  [0].text).toBe("12221");
      expect(data  [1].text).toBe("actual nonretarded comment");
      expect(data  [2].text).toBe("so much spam here");
      expect(data  [0].username).toBe("test");
      expect(data  [1].username).toBe("test");
      expect(data  [2].username).toBe("asas");
      expect(data  [0]._id).toBe(1);
      expect(data  [1]._id).toBe(2);
      expect(data  [2]._id).toBe(3);
      expect(data  [0].videoId).toBe("1");
      expect(data  [1].videoId).toBe("1");
      expect(data  [2].videoId).toBe("1");
      expect(data  [0].userId).toBe("1");
      expect(data  [1].userId).toBe("1");
      expect(data  [2].userId).toBe("2");
    })

  }));
  it('should select and return a list of comments',inject ( [XHRBackend, VideoFeedService],(mockBackend,serv) =>{
    let dudcoments={
      success: true,
      videos: [
              {_id : "5915c2fc62e64f2f84c9071d",
              link:"https://www.youtube.com/watch?v=55WrVVLkWiA",
              description:"asmr",
              title:"asmr",
              username:"test",
              rating:"4",
              datetime:"12.12.1992"
        },
              {_id : "5915c2fc62e64f2f84c9071e",
              link:"https://www.youtube.com/watch?v=55WrVVLkWiA1",
              description:"AS",
              title:"AS",
              username:"test",
              rating:"1",
              datetime:"12.12.1992"
        },
              {_id : "5915c2fc62e64f2f84c9071f",
              link:"https://www.youtube.com/watch?v=55WrVVLkWiA2",
              description:"MR",
              title:"MR",
              username:"asas",
              rating:"2.3",
              datetime:"12.12.1992"
        }
      ]
    };
    mockBackend.connections.subscribe((connection) => {
          connection.mockRespond(new Response(new ResponseOptions({
            body: JSON.stringify(dudcoments)
          })));
      });
    serv.requestVideos("test").subscribe((rezultat)=>{
      let data=rezultat;
      //expect(data).toBe(true);
      expect(data  [0]._id).toBe("5915c2fc62e64f2f84c9071d");
      expect(data  [0].link).toBe("https://www.youtube.com/watch?v=55WrVVLkWiA"),
      expect(data  [0].description).toBe("asmr");
      expect(data  [0].title).toBe("asmr");
      expect(data  [0].username).toBe("test");
      expect(data  [0].rating).toBe("4");
      //expect(data  [0].datetime).toBe(' May 12 2017 ');
      expect(serv.dateFromObjectId(data  [0]._id)+"").toBe("Fri May 12 2017 17:13:16 GMT+0300 (GTB Daylight Time)");
      expect(data  [1]._id).toBe("5915c2fc62e64f2f84c9071e");
      expect(data  [1].link).toBe("https://www.youtube.com/watch?v=55WrVVLkWiA1"),
      expect(data  [1].description).toBe("AS");
      expect(data  [1].title).toBe("AS");
      expect(data  [1].username).toBe("test");
      expect(data  [1].rating).toBe("1");
      //expect(data  [1].datetime).toBe(' May 12 2017 ');

      expect(data  [2]._id).toBe("5915c2fc62e64f2f84c9071f");
      expect(data  [2].link).toBe("https://www.youtube.com/watch?v=55WrVVLkWiA2"),
      expect(data  [2].description).toBe("MR");
      expect(data  [2].title).toBe("MR");
      expect(data  [2].username).toBe("asas");
      expect(data  [2].rating).toBe("2.3");
      //expect(data  [2].datetime).toBe(' May 12 2017 ');

    })

  }));
});
