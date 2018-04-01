import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthentiactionService } from 'app/core/api/auth/authentication.service';

@Component({
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css']
})
export class LoginComponent {

  credentials = {
    username = '',
    password = ''
  };

  //------------------------------------------------------------------------------//

  submit(){

    this.authService.authenticateUser(user).subscribe(data => {
      if(data.success){
        this.authService.storeUserData(data.token, data.user);//todo move this to authenticateUser service
        this.flashMessage.show('You are now logged in', {
          cssClass: 'alert-success',
          timeout: 5000});
        console.log(data.user+"+"+data.token);
        this.router.navigate(['']);
      } else {
        this.flashMessage.show(data.msg, {
          cssClass: 'alert-danger',
          timeout: 5000});
        this.router.navigate(['login']);
      }
    });
  }

  //------------------------------------------------------------------------------//

  constructor(private router: Router,
              private route: ActivatedRoute,
              private authService: AuthentiactionService
  ) { }

}
