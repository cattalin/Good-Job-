import { Component, OnInit,  Input } from '@angular/core';
import { UserProfileService } from '../../services/user-profile.service';
import { ActivatedRoute } from '@angular/router';
import { AuthenticateService } from '../../services/authenticate.service';
import { FlashMessagesService } from 'angular2-flash-messages';


@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css'],
  providers: [UserProfileService]
})
export class ViewProfileComponent implements OnInit {

  private query = {
  sort:   '_id',
  select: null,
  limit:  1000,
  skip:   0,
};


  user: any;
  username: String;
  followers=0;
  currentUser: any;
  isDataAvailable = false; // subscribe is called after template loading

  constructor(private userProfileService: UserProfileService,
              private route: ActivatedRoute,
              private authService: AuthenticateService,
              private flashMessage: FlashMessagesService) {
    // this.username = userProfileService.getUsername();
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
        this.username = params['username'];
        this.query = {
        sort:   '_id',
        select: params['username'], 
        limit:  1000, 
        skip:   0
        };
        this.loadUserContent();
    })

    
    this.authService.getProfile().subscribe( currentUser =>{
      this.currentUser = currentUser.user;
    })
}


private loadUserContent(){
  this.userProfileService.getProfile(this.username).subscribe(data => {
    this.user = data.user;
    this.isDataAvailable = true;
    this.userProfileService.getNumberOfFollowers(this.user._id).subscribe(followers => {
    this.followers=followers.count;})
  },
  err => {
    console.log(err);
    return false;
  });
}


private followUser(){
    this.userProfileService.followUser(this.currentUser._id, this.user._id).subscribe(result => {
      this.followers=this.followers +1;
      this.flashMessage.show('User followed', { cssClass: 'alert-success', timeout: 2000 });
    })
  }


}
