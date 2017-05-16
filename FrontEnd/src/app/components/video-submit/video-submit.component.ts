import { Component, OnInit } from '@angular/core';
import { CheckVideoService } from '../../services/check-video.service';
import { SubmitVideoService } from '../../services/submit-video.service';
import { AuthenticateService } from '../../services/authenticate.service';
import { FlashMessagesService } from 'angular2-flash-messages';
@Component({
  selector: 'video-submit',
  templateUrl: './video-submit.component.html',
  styleUrls: ['./video-submit.component.css']
})
export class VideoSubmitComponent implements OnInit {
  link: String;
  title: String;
  description :String;
  rating : number = 5;

  userId: number;
  username: String;
  class: String;


  constructor(private authService:AuthenticateService,
  private checkVideoService :CheckVideoService, 
  private submitVideoService :SubmitVideoService,
  private flashMessage:FlashMessagesService) { }

  ngOnInit() {
    this.authService.getProfile().subscribe(profile => {
      this.userId=profile.user._id;
      this.username=profile.user.username;
      this.class = profile.user.class;
    },
    err => {
      console.log(err);
      return false;
    });
  }


  submitVideo(){
    if(this.rating==undefined)
      this.flashMessage.show('Please select a rating for the link', 
      {cssClass: 'alert-danger', timeout: 3000});
    if(this.title==undefined){
      //insert the link video title here
      this.flashMessage.show('Please insert a title for the link', 
      {cssClass: 'alert-danger', timeout: 3000});
    }
    if(!this.checkVideoService.checkURL(this.link)){
      this.flashMessage.show('Please insert a valid link', 
      {cssClass: 'alert-danger', timeout: 3000});
    }
    else{
      //console.log(Date());
      var toSend={
        link: this.getCode(this.link),
        title: this.title,
        description: this.description,
        userId: this.userId,
        username: this.username,
        rating: this.rating, 
        class: this.class
      }
      console.log(toSend);
      this.submitVideoService.submitVideo(toSend).subscribe(data=>{
        if(data.success){
          this.flashMessage.show('Upload successful', 
          {cssClass: 'alert-success', timeout: 1000});
        } 
        else{
          this.flashMessage.show('An error occured please try again', 
          {cssClass: 'alert-danger', timeout: 3000});
        }
      });
    }
  }


  getCode(link:String){
    var n = link.indexOf("watch?v=");

    return link.substring(n+8, n+19);
  }

}
