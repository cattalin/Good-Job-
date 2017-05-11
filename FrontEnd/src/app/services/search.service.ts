import { Injectable } from '@angular/core';
import { Http, Response, Headers,URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { VideoComponent } from '../components/video/video.component';
import { SearchFeedComponent} from '../components/search-feed/search-feed.component';
import { tokenNotExpired } from 'angular2-jwt';
import { VideoData } from '../models/video-data';
import 'rxjs/add/operator/map';


@Injectable()
export class SearchService {
  videos: VideoData[] = [];
  comments: any[] = [];
  constructor(private http:Http) { }

  GetRequest(Query:any)
  {
    
   // let parsedQuery = Query.split(" ");
    //ESCAPE THE QUERY!

    let options = new RequestOptions({headers: new Headers({'Content-Type': 'application/json'})});
    let headers = new Headers();
    let params: URLSearchParams = new URLSearchParams()
    params.set("val",Query);

    options.search = params;


  let ep = this.prepEndpoint('routes/search');
    return this.http.get(ep, {search:params}).map(res=>{
        let data = res.json();
        this.videos = [];
        data['videos'].forEach(video => {
            var vid: VideoData = new VideoData(video._id, video.link, video.description,
            video.title, video.username, video.rating, video.datetime);
            this.videos.push(vid);
          });
         return this.videos;

     },
      err=>{

      });
  
  };

   private prepEndpoint(ep){
    return 'http://localhost:8000/'+ep;
  }

}
