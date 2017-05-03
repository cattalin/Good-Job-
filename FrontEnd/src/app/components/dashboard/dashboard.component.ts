import { Component, OnInit } from '@angular/core';
import { AuthenticateService } from '../../services/authenticate.service';
import { CheckclassService } from '../../services/checkclass.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  byRating: boolean = false;
  currentUser: any;


  constructor(private authService:AuthenticateService,
              private checkclassService : CheckclassService) { }

  ngOnInit() {
    this.currentUser = {
      _id: "",
      class: "",
      username: ""
    }


    //getting the current user data of this session
    this.authService.getProfile().subscribe(profile => {
    this.currentUser._id = profile.user._id;
    this.currentUser.class = profile.user.class;
    this.currentUser.username = profile.user.username;
    this.checkclassService.getClassUpdate(this.currentUser).subscribe(newClass => {
          console.log(newClass)});
    }, err => {
    console.log(err);
    return false;
  });
}







  toggleByRating() {
    if (this.byRating === true){
      this.q = {
        sort:   '_id',
        select: null, 
        followerId: null,
        limit:  1000, 
        skip:   0
      };
      this.byRating = false;
      this.requestVideos();
    }

    else {
      this.byRating = true;
      this.q = {
        sort:   'rating',
        select: null,
        followerId: null,
        limit:  1000,
        skip:   0
      };
      this.requestVideos();
    }
  }





}
