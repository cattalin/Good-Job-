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
      console.log(data)
        this.router.navigate(['/users/profile']) //TODO: homepage redirect
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
