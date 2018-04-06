import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { AuthenticationService } from 'app/core/api/authentication.service';
import { UserService } from 'app/core';

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html'
})
export class RootComponent implements OnInit {

  currentUser: any = null;

  constructor(private authService: AuthenticationService, private userService:UserService,
  private router: Router) { }

  ngOnInit() {
    if(localStorage.getItem('GJJwtToken'))
      this.authService.getCurrentUser().subscribe(res=>{
        this.currentUser=res;
        this.userService.currentUser=this.currentUser;
        this.router.navigate(['/videos']);
      });
    else this.router.navigate(['/users/login'])
  }

}
