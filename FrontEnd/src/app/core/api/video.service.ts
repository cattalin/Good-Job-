// Angular
import { Injectable } from '@angular/core';

// Services
import { ApiService } from 'app/core/api/api.service';

@Injectable()
export class VideoService {

  currentUser: any;
  private readonly resourceUrl: string = '/videos';

  //-----------------------------------------------------------------------------//

  constructor(
    private apiService: ApiService
  ) { }
}
