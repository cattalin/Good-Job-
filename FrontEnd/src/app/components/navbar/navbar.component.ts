// Angular
import { Component, OnInit }       from '@angular/core';
import { Router }                  from '@angular/router';

// Services
import { AuthenticationService }   from 'app/core/api/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  currentUser: any;

  ngOnInit() {
    console.log("initialize ")
  }

  onLogoutClick(event){
    this.authService.logout();
    this.router.navigate(['/users/login']);
    event.preventDefault()
    // return false;
  }

  iaPula(){
    console.log('pulicica ' + this.authService.isLoggedIn());
    return this.authService.isLoggedIn();
  }

  constructor(
    public authService: AuthenticationService,
    private router:Router
  ) { }

}
