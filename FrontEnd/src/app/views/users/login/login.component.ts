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
    username: '',
    password: ''
  };

  //------------------------------------------------------------------------------//

  submit(){

    this.authService.login(this.credentials).subscribe(data => {
        this.router.navigate(['/users/register'])
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
