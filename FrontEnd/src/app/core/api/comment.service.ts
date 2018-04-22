// Angular
import { Injectable } from '@angular/core';

// Services
import { ApiService } from 'app/core/api/api.service';

@Injectable()
export class CommentService {

  private readonly videosUrl: string = '/videos/';
  private readonly resourceUrl: string = '/comments';

  //-----------------------------------------------------------------------------//

  newComment(comment) {
   return this.apiService.post(`${this.videosUrl+comment.videoId+this.resourceUrl}`, {text: comment.text})
      .map(res => {
        if(res.success) return res;
        else throw res.status;
      });
  }

  //-----------------------------------------------------------------------------//

  getComments(videoId) {
    return this.apiService.get(`${this.videosUrl+videoId+this.resourceUrl}`)
      .map(res => {
        if(res.success) return res;
        else throw res.status;
      });
  }

  //-----------------------------------------------------------------------------//



  //-----------------------------------------------------------------------------//

  constructor(
    private apiService: ApiService
  ) { }
}
