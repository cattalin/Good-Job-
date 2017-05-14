import { Component, Input, OnInit, SecurityContext } from '@angular/core';
import { VideoData } from '../../models/video-data';
import { DomSanitizer, SafeUrl} from '@angular/platform-browser';
import { FormsModule, FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { VideoFeedService } from '../../services/videofeed/video-feed.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit {


  newComment: any = null;
  @Input() isPostComment=false;
  @Input() data: VideoData;
  @Input() user: any;
  private safeLink: SafeUrl;

  constructor(private sanitizer: DomSanitizer,
              private videoService: VideoFeedService,
              private router: Router){ }


  ngOnInit() {
    this.safeLink = this.sanitizer.bypassSecurityTrustResourceUrl("https://www.youtube.com/embed/"+this.data.link);
    this.isPostComment = false;
  }

  public get getCode() : SafeUrl{
    return this.safeLink;
  }

  getTimestamp(){
    let date = new Date(parseInt(this.data._id.toString().slice(0,8), 16)*1000);
    return "on " + date.toLocaleDateString()+" at "+date.toLocaleTimeString();;
  }


  rate(event){
    const rate = {
      _id: this.data._id,
      userId: this.user._id,
      class: this.user.class,
      rating: 0
    }
    switch (event.currentTarget.id){
      case 'gj':
        rate.rating=5;
        console.log(rate);
        this.videoService.rate(rate).subscribe(res =>{
          if (res.success){
            console.log("success");
            this.data.rating = res.result.rating;
            //event.currentTarget.disabled=true;
          }
        })
      break;
      case 'cool':
        rate.rating=3;
        this.videoService.rate(rate).subscribe(res =>{
          if (res.success){
            console.log("success");
            this.data.rating = res.result.rating;
            //event.currentTarget.disabled=true;
          }
        })
      break;
      case 'meh':
        rate.rating=1;
        this.videoService.rate(rate).subscribe(res =>{
          if (res.success){
            console.log("success");
            this.data.rating = res.result.rating;
            //event.currentTarget.disabled=true;
          }
        })
        console.log(rate);
      break;
    }
  }

  postComment() {
    this.isPostComment=true;
  }

  cancelComment() {
    this.isPostComment=false;
  }
  redirect(){
    this.router.navigate(['/user-profile'], {queryParams: {username: this.data.username}})
  }


  getNewComment(event){
    if(event!=null){
      this.isPostComment=false;
      this.newComment = event;
    }
    
  }




  addRateAndButtons(event){
    this.addButtons(event);
    this.rate(event);
  }
  addButtons(event){
    event.Target.classList.remove(' btn-primary'); // To Remove
    event.Target.classList.add(' btn-warning'); // To ADD
    //event.target.classList.add('class3'); // To ADD
  }

}
