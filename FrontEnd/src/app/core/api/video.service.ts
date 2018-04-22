// Angular
import { Injectable } from '@angular/core';

// Services
import { ApiService } from 'app/core/api/api.service';

@Injectable()
export class VideoService {

  currentUser: any;
  private readonly resourceUrl: string = '/videos';

  //-----------------------------------------------------------------------------//

  getVideoFeed(criteria) {
    return this.apiService.post(`${this.resourceUrl}/search`, criteria)
      .map(res => {
        if(res.success) return res;
        else throw res.status;
      });
  }

  //-----------------------------------------------------------------------------//

  uploadVideo(video) {

    video.link=video.link.replace("https://www.youtube.com/watch?v=","");
    return this.apiService.post(`${this.resourceUrl}`, video)
      .map(res => {
        if(res.success) return res;
        else throw res.status;
      });
  }

  //-----------------------------------------------------------------------------//

  delete(videoId) {
    return this.apiService.delete(`${this.resourceUrl}/`+videoId)
      .map(res => {
      if(res.code==200) return res;
      else throw res.status;
    });
  }

  //-----------------------------------------------------------------------------//

  constructor(
    private apiService: ApiService
  ) { }
}
