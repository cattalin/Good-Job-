// Angular
import { Injectable } from '@angular/core';

// Services
import { ApiService } from 'app/core/api/api.service';

@Injectable()
export class CommentService {

  private readonly resourceUrl: string = '/comments';

  //-----------------------------------------------------------------------------//
 
  newComment(comment) {
   return this.apiService.post(`${this.resourceUrl}`, comment)
      .map(res => {
        if(res.success) return res;
        else throw res.status;
      });
  }

  //-----------------------------------------------------------------------------//



  //-----------------------------------------------------------------------------//



  //-----------------------------------------------------------------------------//

  constructor(
    private apiService: ApiService
  ) { }
}
