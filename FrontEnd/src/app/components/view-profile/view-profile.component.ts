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

  private q = {
  sort:   '_id',
  select: null,
  limit:  1000,
  skip:   0,
};


  user: any;
  username: String;
  currentUserId: String;
  isDataAvailable = false; // subscribe is called after template loading

  constructor(private userProfileService: UserProfileService,
              private route: ActivatedRoute,
              private  authService: AuthenticateService,
              private flashMessage: FlashMessagesService) {
    // this.username = userProfileService.getUsername();
    route.data.subscribe(v => {this.username=v.username});
    
  }

  ngOnInit() {
    
    this.route.params.subscribe(params => {
       this.username = params['username'];
       this.q.select = this.username;

       this.userProfileService.getProfile(this.username).subscribe(data => {
          this.user = data.user;
          this.isDataAvailable = true;
        },
      err => {
        console.log(err);
        return false;
      });
    });
    this.authService.getProfile().subscribe( currentUser =>{
      this.currentUserId = currentUser.user._id;
    })

  }


  followUser(){
    this.userProfileService.followUser(this.currentUserId, this.user._id).subscribe(result => {
      this.flashMessage.show('User followed', { cssClass: 'alert-success', timeout: 2000 });
    })
  }


}
