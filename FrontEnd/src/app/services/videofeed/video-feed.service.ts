import { Injectable } from '@angular/core';
import { VideoComponent } from '../../components/video/video.component';
import { VideoData } from '../../models/video-data';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';
import { URLSearchParams, RequestOptions } from '@angular/http';
import { prepEndpoint } from '../server-connection.service';

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
    let ep = prepEndpoint('routes/comments');

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
    let options = new RequestOptions();
    let headers = new Headers({'Content-Type': 'application/json'});
    let params: URLSearchParams = new URLSearchParams();


    //todo remove this when rewriting
    const token = localStorage.getItem('id_token');
    console.warn(token);
    headers.append('Authorization', token);




    for (let key in query){
      params.set(key.toString(), query[key]);
    }


    options.search = params;
    options.headers = headers;
    let ep = prepEndpoint('routes/feed');
    if(query.followerId != null){
      ep = prepEndpoint('routes/feedByFollow');
    }

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
      })
  }
  searchVideos(query: any){
    let options = new RequestOptions({headers: new Headers({'Content-Type': 'application/json'})});
    let headers = new Headers();
    let params: URLSearchParams = new URLSearchParams();
    for (let key in query){
      params.set(key.toString(), query[key]);
    }


    options.search = params;
    let ep = prepEndpoint('routes/search');
    return this.http.get(ep, options).map(res => {
      let data = res.json();
        if(data.success){
          this.videos = [];
          data['videos'].forEach(video => {
            var vid: VideoData = new VideoData(video._id, video.link, video.description,
            video.title, video.username, video.rating);
            this.videos.push(vid);
          });
          return this.videos;
        }
        else{
          console.log("Nice error")
        }
      })
  }
  countVideos(query: any){
    let options = new RequestOptions({headers: new Headers({'Content-Type': 'application/json'})});
    let headers = new Headers();
    let params: URLSearchParams = new URLSearchParams();
    for (let key in query){
      params.set(key.toString(), query[key]);

    }
    options.search = params;
    let ep = prepEndpoint('routes/feedCount');
    if(query.followerId != null){
      ep = prepEndpoint('routes/feedCountByFollow');
    }
    return this.http.get(ep, options).map(res => {
      let data = res.json();

        if(data.success){
          return data.nrVideos;
        }
        else{
          console.log("Nice error")
        }
    })
  }
  countSearchedVideos(query: any){
    let options = new RequestOptions({headers: new Headers({'Content-Type': 'application/json'})});
    let headers = new Headers();
    let params: URLSearchParams = new URLSearchParams();
    for (let key in query){
      params.set(key.toString(), query[key]);

    }
    options.search = params;
    let ep = prepEndpoint('routes/searchCount');
    return this.http.get(ep, options).map(res => {
      let data = res.json();

        if(data.success){
          return data.nrVideos;
        }
        else{
          console.log("Nice error")
        }
    })
  }





  rate(rate){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let ep = prepEndpoint('routes/rate');
    return this.http.post(ep, rate, { headers: headers })
      .map(res => res.json());
  }

  hasRated(target: any){
    let options = new RequestOptions({headers: new Headers({'Content-Type': 'application/json'})});
    let headers = new Headers();
    let params: URLSearchParams = new URLSearchParams();
    for (let key in target){
      params.set(key.toString(), target[key]);
    }
    options.search = params;

    let ep = prepEndpoint('routes/hasRated');
    return this.http.get(ep, options).map(res => res.json());
  }


  remove(id) {
     let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let ep = prepEndpoint('routes/delete');
    return this.http.post(ep, id, { headers: headers })
      .map(res => res.json());
  }

  // functia care transforma id ul unic de mongo in data ...
  private dateFromObjectId(objectId) {
    return new Date(parseInt(objectId.substring(0, 8), 16) * 1000);
  };
}
