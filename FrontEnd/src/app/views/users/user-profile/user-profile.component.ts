import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'app/core/api/user.service';

@Component({
  templateUrl: 'user-profile.component.html',
  styleUrls: ['user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  currentUser: any;

  //------------------------------------------------------------------------------//

  ngOnInit() {
    this.currentUser=this.userService.currentUser;
    console.log(this.currentUser)
  }

  //------------------------------------------------------------------------------//

  constructor(private router: Router,
              private route: ActivatedRoute,
              private userService: UserService
  ) { }

}
