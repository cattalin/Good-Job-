import { Component, OnInit } from '@angular/core';
import { CheckVideoService } from '../../services/check-video.service';
import { SubmitVideoService } from '../../services/submit-video.service';
import { AuthenticateService } from '../../services/authenticate.service';
import { FlashMessagesService } from 'angular2-flash-messages';
@Component({
  selector: 'submit-video',
  templateUrl: './submit-video.component.html',
  styleUrls: ['./submit-video.component.css']
})
export class SubmitVideoComponent implements OnInit {
  link: String;
  title: String;
  description :String;
  rating : number;
  userId: number;


  constructor(private authService:AuthenticateService,
  private checkVideoService :CheckVideoService, 
  private submitVideoService :SubmitVideoService,
  private flashMessage:FlashMessagesService) { }

  ngOnInit() {
    this.authService.getProfile().subscribe(profile => {
      this.userId=profile.user._id;
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
      console.log(Date());
      var toSend={
        userId: this.userId,
        title: this.title,
        link: this.getCode(this.link),
        description: this.description,
        rating: this.rating
      }
      this.submitVideoService.submitVideo(toSend).subscribe((data)=>{
        if(data.success){
          this.flashMessage.show('Uplod successful', 
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

    return link.substring(n, n+11);
  }

}
