import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'app/core/api/user.service';

@Component({
  templateUrl: 'user-profile.component.html',
  styleUrls: ['user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  currentUser: any;
  viewUser: any;
  viewUserInfo: any;

  //------------------------------------------------------------------------------//

  ngOnInit() {
    this.currentUser=this.userService.currentUser;

    var paramId = this.route.snapshot.paramMap.get('username');
    if(paramId) {
      this.viewUser=paramId;
      this.userService.getUserByUsername(this.viewUser).subscribe(res=>{
        this.viewUserInfo=res.user;
      })
    }
  }

  //------------------------------------------------------------------------------//

  constructor(private router: Router,
              private route: ActivatedRoute,
              private userService: UserService
  ) { }

}
