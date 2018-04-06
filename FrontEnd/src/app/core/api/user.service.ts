// Angular
import { Injectable } from '@angular/core';

// Services
import { ApiService } from 'app/core/api/api.service';

@Injectable()
export class UserService {

  currentUser: any;
  private readonly resourceUrl: string = '';

  //-----------------------------------------------------------------------------//

  updatePassword(user) {
    return this.apiService.post(`${this.resourceUrl}/updatepassword`,user);
  }

  //-----------------------------------------------------------------------------//

  updateEmail(user) {
    return this.apiService.post(`${this.resourceUrl}/updateemail`,user);
  }

  //-----------------------------------------------------------------------------//

  updateName(user) {
    return this.apiService.post(`${this.resourceUrl}/updatename`,user);
  }

  //-----------------------------------------------------------------------------//

  constructor(
    private apiService: ApiService
  ) { }
}
