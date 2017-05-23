import { Component, OnInit } from '@angular/core';
import { AuthenticateService } from '../../services/authenticate.service';
import { CheckclassService } from '../../services/checkclass.service';
import { FlashMessagesService } from 'angular2-flash-messages';

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

  byDate: boolean = true;
  byRating: boolean = false;
  following: boolean = false;
  currentUser: any;


  constructor(private authService:AuthenticateService,
              private flashMessage: FlashMessagesService,
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
          console.log(newClass);
          if(newClass.result.newClass.indexOf(newClass.result.oldClass)!=0){
            this.flashMessage.show("FELICITARI ! Ai urcat de la clasa "+newClass.result.oldClass+" la clasa "+newClass.result.newClass,{ cssClass: 'alert-success' });
          } 
        });
    }, err => {
    console.log(err);
    return false;
  });
}







  toggleByRating(param) {

    if(param===1) {
      this.byDate=false;
      this.following=false;
      this.byRating=true;

      this.query = {
        sort:   '_id',
        select: null, 
        followerId: null,
      };

    } else if(param===2) {
      this.byDate=true;
      this.following=false;
      this.byRating=false;

      this.query = {
        sort:   'rating',
        select: null,
        followerId: null,
      };

    } else if(param===3) {
      this.byDate=false;
      this.following=true;
      this.byRating=false;

      this.query = {
        sort:   '_id',
        select: null,
        followerId: this.currentUser._id,
      };

    }

  }





}
