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

  getNumberOfComments(videoId) {
    return this.apiService.get(`${this.videosUrl+videoId+this.resourceUrl}/count`)
      .map(res => {
        return res; //TODO:
        //else throw res.status;
      });
  }

  //-----------------------------------------------------------------------------//

  deleteComment(videoId, commentId) {
    return this.apiService.delete(`${this.videosUrl+videoId+this.resourceUrl}/`+commentId)
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
