import { Component } from '@angular/core';
import { AuthenticationService } from 'app/core/api/auth/authentication.service';
import { FlashMessagesService } from 'angular2-flash-messages';


@Component({
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css']
})
export class LoginComponent {

  credentials = {
    username: '',
    password: ''
  };

  //------------------------------------------------------------------------------//

  submit(){

    this.authService.login(this.credentials).subscribe(data => {
      console.log(JSON.stringify(data));
      this.flashMessage.show('You are now logged in', {
        cssClass: 'alert-success',
        timeout: 5000});
      // this.router.navigate(['']);
    }, err=> {
      this.flashMessage.show('There was an error. Please try again.', {
        cssClass: 'alert-danger',
        timeout: 5000});
    });
  }

  //------------------------------------------------------------------------------//

  constructor(
    private authService: AuthenticationService,
    private flashMessage:FlashMessagesService
  ) { }

}
