import { Component, OnInit, Input } from '@angular/core';
import { AuthenticateService } from '../../services/authenticate.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { FormsModule, FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { SubmitVideoService } from '../../services/submit-video.service';


@Component({
  selector: 'app-submit-comment',
  templateUrl: './submit-comment.component.html',
  styleUrls: ['./submit-comment.component.css']
})
export class SubmitCommentComponent implements OnInit {

  @Input() videoId: number;
  @Input() user: any;
  userId: number;
  username: String;
  text: String;

  submitCommentForm: FormGroup;

  constructor(private authService:AuthenticateService,
              private flashMessage:FlashMessagesService,
               private submitVideoService :SubmitVideoService,
               private comm: FormBuilder) { }

  ngOnInit() {

  this.submitCommentForm=this.comm.group({
          text: ['']
      });

  
  }

  submitComment() {
    var toSend={
        text: this.text,
        username: this.user.username,
        userId: this.user._id,
        class: this.user.class,
        videoId: this.videoId
    }
    console.log(toSend);

    this.submitVideoService.submitComment(toSend).subscribe(data=>{
        if(data.success){
          console.log("wow merge");
          this.flashMessage.show('Submitted.', 
          {cssClass: 'alert-success', timeout: 1000});
        } 
        else{
          this.flashMessage.show('An error occured please try again', 
          {cssClass: 'alert-danger', timeout: 3000});
        }
      });



  }

}
