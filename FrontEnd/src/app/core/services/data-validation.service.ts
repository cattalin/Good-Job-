import { Injectable } from '@angular/core';

@Injectable()
export class DataValidationService {

  isEqual(email:string, conf_email: string): boolean {
    return email==conf_email;
  }

}
