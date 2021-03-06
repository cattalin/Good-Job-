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
  loaded=false;
  isMyVideo=false;
  selectedRateButton: String = "none";
  exists = true;
  @Input() isPostComment=false;
  @Input() data: VideoData;
  @Input() user: any;
  private safeLink: SafeUrl;

  constructor(private sanitizer: DomSanitizer,
              private videoService: VideoFeedService,
              private router: Router){ } 


  ngOnInit() {
    if(this.user!=null)
    if(this.data.username===this.user.username)  {
            this.isMyVideo=true;
    }




    let target = {
      userId: this.user._id,
      videoId: this.data._id,
    }
    this.videoService.hasRated(target).subscribe(res =>{
        this.hasRated(res.result);
        
    });





    this.safeLink = this.sanitizer.bypassSecurityTrustResourceUrl("https://www.youtube.com/embed/"+this.data.link);
    this.isPostComment = false;
  }

  public getCode() : SafeUrl{
    return this.safeLink;
  }

  getTimestamp(){
    let date = new Date(parseInt(this.data._id.toString().slice(0,8), 16)*1000);
    return "on " + date.toLocaleDateString()+" at "+date.toLocaleTimeString();
  }



  hasRated(value){
    switch (value){
      case 5:
        this.selectedRateButton = "gj";
      break;
      case 3:
        this.selectedRateButton = "cool";
      break;
      case 1:
        this.selectedRateButton = "meh";
      break;
      case 0:
        this.selectedRateButton = "none";
      break;
    }
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
        this.selectedRateButton = "gj";
        rate.rating=5;
      break;
      case 'cool':
        this.selectedRateButton = "cool";
        rate.rating=3;
      break;
      case 'meh':
        this.selectedRateButton = "meh";
        rate.rating=1;
      break;
    }

    this.videoService.rate(rate).subscribe(res =>{
      if (res.success){
        this.data.rating = res.result.rating;
        if(res.result.currentVote==0){
          this.selectedRateButton = "none";
        }
      }
    })
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


  
  deleteVideo() {

    this.videoService.remove(this.data).subscribe(res =>{
      if (res.success){
        this.exists = false;
        console.log("success");
      }
    })
  }


}
