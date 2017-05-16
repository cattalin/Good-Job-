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
  comments: any[] = [];
  constructor(private http:Http) { }


  getComments(query: any){
    let options = new RequestOptions({headers: new Headers({'Content-Type': 'application/json'})});
    let headers = new Headers();
    let params: URLSearchParams = new URLSearchParams();
    for (let key in query){
      params.set(key.toString(), query[key]);
    }
    options.search = params;
    let ep = this.prepEndpoint('routes/comments');

    return this.http.get(ep, options).map(res => {
      let data = res.json();
      if(data.success){
        this.comments = [];
        data['comments'].forEach(comment => {
              let comm = {
                _id: comment._id,
                text: comment.text,
                userId: comment.userId,
                videoId: comment.videoId,
                username: comment.username
              }
              this.comments.push(comm);
        });
        return this.comments;
      } 
      else{
        console.log("Nice error")
      }},
      err=>{

      });
  }


  getVideos(query: any){
    let options = new RequestOptions({headers: new Headers({'Content-Type': 'application/json'})});
    let headers = new Headers();
    let params: URLSearchParams = new URLSearchParams();
    for (let key in query){
      params.set(key.toString(), query[key]);
    }
   

    options.search = params;
    let ep = this.prepEndpoint('routes/feed');
    return this.http.get(ep, options).map(res => {
      let data = res.json();

        if(data.success){
          this.videos = [];
          data['videos'].forEach(video => {
            var vid: VideoData = new VideoData(video._id, video.link, video.description, video.title, video.username, video.rating);
            this.videos.push(vid);
          });
          return this.videos;
        }  
        else{
          console.log("Nice error")
        }
      },
      err=>{

      });
  }
  rate(rate){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let ep = this.prepEndpoint('routes/rate');
    return this.http.post(ep, rate, { headers: headers })
      .map(res => res.json());
  }

  remove(id) {
     let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let ep = this.prepEndpoint('routes/delete');
    return this.http.post(ep, id, { headers: headers })
      .map(res => res.json());
  }

  // functia care transforma id ul unic de mongo in data ...
  private dateFromObjectId(objectId) {
    return new Date(parseInt(objectId.substring(0, 8), 16) * 1000);
  };
  private prepEndpoint(ep){
    return 'http://localhost:8000/'+ep;
  }

}
