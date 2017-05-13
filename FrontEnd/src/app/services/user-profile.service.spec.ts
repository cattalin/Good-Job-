import { TestBed, inject ,async} from '@angular/core/testing';
import { Response,HttpModule, Http, ResponseOptions, XHRBackend } from '@angular/http';
import { UserProfileService } from './user-profile.service';
import { MockBackend } from '@angular/http/testing';
describe('UserProfileService', () => {
 
  beforeEach(()=>{
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers:[ { provide: XHRBackend, useClass: MockBackend},UserProfileService] 
    });
  });

  it("should initialise",
    inject ( [XHRBackend,UserProfileService],(mockBackend,serv)=>{
    expect(serv).toBeTruthy();
    }));

  it("should return an ok user object, colect it and send it away",
    inject ( [XHRBackend,UserProfileService],(mockBackend,serv)=>{
    let ProfileResponseCorect={
         success:true,
         user:{name:"test",
               username:"test",
               email:"test@test.aa",
               password:"aidfsljoxnj rsehfdibngyeahdofsz;imlnkidhjsiokzfxgonj7er8ets9joaerkwsb9vg2j30rv75h0",
               class:"D"
            }
    };
    
    mockBackend.connections.subscribe((connection) => {
          connection.mockRespond(new Response(new ResponseOptions({
            body: JSON.stringify(ProfileResponseCorect)
          })));
    });
 
    serv.getProfile("marcel").subscribe((profil)=>{
      expect(profil.success).toEqual(true);    
      expect(profil.user.name).toEqual("test");
      expect(profil.user.username).toEqual("test");
      expect(profil.user.email).toEqual("test@test.aa");
      expect(profil.user.password).toEqual("aidfsljoxnj rsehfdibngyeahdofsz;imlnkidhjsiokzfxgonj7er8ets9joaerkwsb9vg2j30rv75h0");
      expect(profil.user.class).toEqual("D");
    })
  }));
it("should return nothing if there is no such user",
    inject ( [XHRBackend,UserProfileService],(mockBackend,serv)=>{
    let ProfileResponseCorect={
         success:false,
         user:{name:"test",
               username:"test",
               email:"test@test.aa",
               password:"aidfsljoxnj rsehfdibngyeahdofsz;imlnkidhjsiokzfxgonj7er8ets9joaerkwsb9vg2j30rv75h0",
               class:"D"
            }
    };
    
    mockBackend.connections.subscribe((connection) => {
          connection.mockRespond(new Response(new ResponseOptions({
            body: JSON.stringify(ProfileResponseCorect)
          })));
    });
 
    serv.getProfile("marcel").subscribe((profil)=>{
      expect(profil).toBe(undefined);
    })
  }));


  it("should return an ok user object using that email, colect it and send it away",
    inject ( [XHRBackend,UserProfileService],(mockBackend,serv)=>{
    let ProfileResponseCorect={
         success:true,
         user:{name:"test",
               username:"test",
               email:"test@test.aa",
               password:"aidfsljoxnj rsehfdibngyeahdofsz;imlnkidhjsiokzfxgonj7er8ets9joaerkwsb9vg2j30rv75h0",
               class:"D"
            }
    };
    
    mockBackend.connections.subscribe((connection) => {
          connection.mockRespond(new Response(new ResponseOptions({
            body: JSON.stringify(ProfileResponseCorect)
          })));
    });
 
    serv.getProfileByEmail("marcel@marcel.com").subscribe((profil)=>{
      expect(profil.success).toEqual(true);    
      expect(profil.user.name).toEqual("test");
      expect(profil.user.username).toEqual("test");
      expect(profil.user.email).toEqual("test@test.aa");
      expect(profil.user.password).toEqual("aidfsljoxnj rsehfdibngyeahdofsz;imlnkidhjsiokzfxgonj7er8ets9joaerkwsb9vg2j30rv75h0");
      expect(profil.user.class).toEqual("D");
    })
  }));
it("should return nothing if there is no such user",
    inject ( [XHRBackend,UserProfileService],(mockBackend,serv)=>{
    let ProfileResponseCorect={
         success:false,
         user:{name:"test",
               username:"test",
               email:"test@test.aa",
               password:"aidfsljoxnj rsehfdibngyeahdofsz;imlnkidhjsiokzfxgonj7er8ets9joaerkwsb9vg2j30rv75h0",
               class:"D"
            }
    };
    
    mockBackend.connections.subscribe((connection) => {
          connection.mockRespond(new Response(new ResponseOptions({
            body: JSON.stringify(ProfileResponseCorect)
          })));
    });
 
    serv.getProfileByEmail("marcel@marcel.com").subscribe((profil)=>{
      expect(profil).toBe(undefined);
    })
  }));
  it("should return just a number",
    inject ( [XHRBackend,UserProfileService],(mockBackend,serv)=>{
    
    mockBackend.connections.subscribe((connection) => {
          connection.mockRespond(new Response(new ResponseOptions({
            body: JSON.stringify(15)
          })));
    });
 
    serv.getNumberOfFollowers("marcel@marcel.com").subscribe((count)=>{
      expect(count).toBe(15);
    })
  }));
  it("should return a list of followers",
    inject ( [XHRBackend,UserProfileService],(mockBackend,serv)=>{
    let data=[{followerId:1 , followedId:2},{followerId:2 , followedId:3},{followerId:3 , followedId:1}];
    mockBackend.connections.subscribe((connection) => {
          connection.mockRespond(new Response(new ResponseOptions({
            body: JSON.stringify(data)
          })));
    });
 
    serv.getListOfFollowings(1).subscribe((list)=>{
      expect(list[0].followerId).toBe(1);
      expect(list[1].followedId).toBe(3);
      expect(list[2].followerId).toBe(3);
    })
  }));
it("should return nothing if there is no follower",
    inject ( [XHRBackend,UserProfileService],(mockBackend,serv)=>{
    let data=null;
    mockBackend.connections.subscribe((connection) => {
          connection.mockRespond(new Response(new ResponseOptions({
            body: JSON.stringify(data)
          })));
    });
 
    serv.getListOfFollowings(1).subscribe((list)=>{
      expect(list).toBe(undefined);
    })
  }));
  it("should get and set user name",
    inject ( [XHRBackend,UserProfileService],(mockBackend,serv)=>{
    serv.setUsername("macarena");
    expect(serv.getUsername()).toEqual("macarena");
  }));
});
