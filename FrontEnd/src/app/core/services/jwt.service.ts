import { Injectable } from '@angular/core';

@Injectable()
export class JwtService {

  protected readonly storageKey: string = 'GJJwtToken';

  getToken(): string {
    return window.localStorage[this.storageKey];
  }

  saveToken(token: String) {
    window.localStorage[this.storageKey] = token;
  }

  destroyToken() {
    window.localStorage.removeItem(this.storageKey);
  }

}
