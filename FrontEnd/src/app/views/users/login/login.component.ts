import { Component, NgZone } from '@angular/core';
import { AuthenticationService } from 'app/core/api/authentication.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css']
})
export class LoginComponent {

  credentials = {
    username: 'alinuta',
    password: 'testing'
  };

  //------------------------------------------------------------------------------//

  submit(){

    this.authService.login(this.credentials).subscribe(data => {
        this.router.navigate(['/videos'])
    }, err => {
      this.flashMessage.show(err, {
        cssClass: 'alert-danger',
        timeout: 5000});
    });
  }

  //------------------------------------------------------------------------------//

  constructor(
    private authService: AuthenticationService,
    private flashMessage:FlashMessagesService,
    private router: Router ,
    private zone: NgZone
  ) { }

}
