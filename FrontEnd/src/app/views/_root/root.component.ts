import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'app/core/api/authentication.service';
import { UserService } from 'app/core';

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html'
})
export class RootComponent implements OnInit {

  currentUser: any = null;

  constructor(private authService: AuthenticationService, private userService:UserService) { }

  ngOnInit() {
    if(localStorage.getItem('GJJwtToken'))
    this.authService.getCurrentUser().subscribe(res=>{
      this.currentUser=res;
      this.userService.currentUser=this.currentUser;
      console.log(this.userService.currentUser)
    });
  }

}
