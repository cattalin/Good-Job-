import { Component, OnInit } from '@angular/core';
import { UserProfileService } from '../../services/user-profile.service';


@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css'],
  providers: [UserProfileService]
})
export class ViewProfileComponent implements OnInit {

  user: any;
  username: String;
  isDataAvailable = false; // subscribe is called after template loading

  constructor(private userProfileService: UserProfileService) {
    // this.username = userProfileService.getUsername();
    this.username = 'angoana2';
  }

  ngOnInit() {
    this.userProfileService.getProfile(this.username).subscribe(data => {
      this.user = data.user;
      this.isDataAvailable = true;
    },
      err => {
        console.log(err);
        return false;
      });
  };

}
