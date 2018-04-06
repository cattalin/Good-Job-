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

  constructor(
    private apiService: ApiService
  ) { }
}
