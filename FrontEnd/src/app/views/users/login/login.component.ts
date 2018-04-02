import { Component } from '@angular/core';
import { AuthenticationService } from 'app/core/api/auth/authentication.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

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
      this.flashMessage.show('You are now logged in', {
        cssClass: 'alert-success',
        timeout: 5000});
      this.router.navigate(['']);
    }, err=> {
      this.flashMessage.show(err, {
        cssClass: 'alert-danger',
        timeout: 5000});
    });
  }

  //------------------------------------------------------------------------------//

  constructor(
    private authService: AuthenticationService,
    private flashMessage:FlashMessagesService,
    private router: Router
  ) { }

}
