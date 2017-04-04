import { Injectable } from '@angular/core';
import { VideoComponent } from '../../components/video/video.component';
import { VideoData } from '../../models/video-data';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';
import { URLSearchParams, RequestOptions } from '@angular/http';

@Injectable()
export class VideoFeedService {


  constructor(private http:Http) { 

  }

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
    this.http.get(ep, options)
      .map(res => {console.log(res); res.json()});
    
    return [
      new VideoData("oprrx0Yjy4U",  "podcastul secolului"),
      new VideoData("Gazp4GpbcAM",  "tutorialu secolului"),
      new VideoData("oprrx0Yjy4U",  "podcastul secolului"),
      new VideoData("Gazp4GpbcAM",  "tutorialu secolului")
    ]
  }

  private prepEndpoint(ep){
    return 'http://localhost:8000/'+ep;
  }

}
