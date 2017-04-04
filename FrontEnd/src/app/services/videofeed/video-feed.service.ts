import { Injectable } from '@angular/core';
import { VideoComponent } from '../../components/video/video.component';
import { VideoData } from '../../models/video-data';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';
import { URLSearchParams, RequestOptions } from '@angular/http';

@Injectable()
export class VideoFeedService {

  videos: VideoData[] = [];

  constructor(private http:Http) { }
 

  
  getVideos(query: any){
    let options = new RequestOptions({headers: new Headers({'Content-Type': 'application/json'})});
    let headers = new Headers();
    let params: URLSearchParams = new URLSearchParams();
    for (let key in query){
      params.set(key.toString(), query[key]);
    }

    options.search = params;
    //this.loadToken();
    //headers.append('Authorization', this.authToken);
    //headers.append('Content-Type','application/json');


    let ep = this.prepEndpoint('routes/feed');
    return this.http.get(ep, options).map(res => {
      let data = res.json();
      let i=0;
        if(data.success){
          data['videos'].forEach(video => {
               //console.log("##"+video.link+ video.description);
               var vid: VideoData = new VideoData(video.link, video.description,
               video.title, video.username, video.rating);
               this.videos[i++]=vid;
          });
          return this.videos;
        } 
        else{
          console.log("Nice error")
        }
      },
      err=>{

      });
    



    //res.forEach(element => {
      
    //});
    /*return [
      new VideoData("oprrx0Yjy4U",  "podcastul secolului"),
      new VideoData("Gazp4GpbcAM",  "tutorialu secolului"),
      new VideoData("oprrx0Yjy4U",  "podcastul secolului"),
      new VideoData("Gazp4GpbcAM",  "tutorialu secolului")
    ]*/
  }

  private prepEndpoint(ep){
    return 'http://localhost:8000/'+ep;
  }

}
