import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthenticateService } from '../../services/authenticate.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { FormsModule, FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { SubmitVideoService } from '../../services/submit-video.service';


@Component({
  selector: 'app-comment-submit',
  templateUrl: './comment-submit.component.html',
  styleUrls: ['./comment-submit.component.css']
})
export class CommentSubmitComponent implements OnInit {
  @Output() newCommentData = new EventEmitter<any>();

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
    const toSend={
        text: this.text,
        username: this.user.username,
        userId: this.user._id,
        class: this.user.class,
        videoId: this.videoId
    }
    if(this.text!=null){
      this.submitVideoService.submitComment(toSend).subscribe(data=>{
        if(data.success){
          this.flashMessage.show('Submitted.', 
          {cssClass: 'alert-success', timeout: 1000});

          let eventData = toSend;
          this.newCommentData.emit(eventData);
        } 
        else{
          this.flashMessage.show('An error occured please try again', 
          {cssClass: 'alert-danger', timeout: 3000});
        }
      });
    }
    



  }

}

