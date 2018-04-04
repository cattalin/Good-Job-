// Angular
import { Component, OnInit }       from '@angular/core';
import { Router }                  from '@angular/router';
import { FlashMessagesService }    from 'angular2-flash-messages';

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
 

  }

  onLogoutClick(){
    this.authService.logout();
    this.router.navigate(['/users/login']);
    return false;
  }

  constructor(
    public authService: AuthenticationService,
    private router:Router
  ) { }

}
