import { Component, OnInit } from '@angular/core';
import { AuthenticateService } from '../../services/authenticate.service';
import { CheckclassService } from '../../services/checkclass.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  private query = {
    sort:   '_id',  //user to sort out of database
    select: null,   //filter the results(example:   select:"username:catalin"")
    followerId: null,//only use for searching the videos of the users that one user follows(following system)
}

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
      this.query = {
        sort:   '_id',
        select: null, 
        followerId: null,
      };
      this.byRating = false;
    }

    else {
      this.byRating = true;
      this.query = {
        sort:   'rating',
        select: null,
        followerId: null,
      };
    }
  }





}
