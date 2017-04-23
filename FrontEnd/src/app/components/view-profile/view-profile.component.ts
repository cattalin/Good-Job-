import { Component, OnInit,  Input } from '@angular/core';
import { UserProfileService } from '../../services/user-profile.service';
import { ActivatedRoute } from '@angular/router';

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
  isDataAvailable = false; // subscribe is called after template loading

  constructor(private userProfileService: UserProfileService,
              private route: ActivatedRoute) {
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
    
    
  };

}
