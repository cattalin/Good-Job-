// Angular
import { Component, Input, OnInit }     from '@angular/core';
import { Router }                       from '@angular/router';
import { DomSanitizer, SafeUrl}         from '@angular/platform-browser';


// Services
import { UserService } from 'app/core/api/user.service';


import { VideoFeedService } from '../../services/videofeed/video-feed.service';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit {

  @Input() video;
  currentUser;



  newComment: any = null;
  selectedRateButton: String = "none";
  exists = true;
  isPostComment=false;
  videoUrl:SafeUrl = null;

  ngOnInit() {
    console.log('Initing video');
    this.currentUser = this.userService.currentUser;
    this.ratingManager(); //TODO: refactor

    this.isPostComment = false; //TODO: rename

    this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl("https://www.youtube.com/embed/"
      +this.video.link);

  }

  ratingManager() {
    let target = {
      userId: this.currentUser._id,
      videoId: this.video._id,
    }
    // this.videoService.hasRated(target).subscribe(res =>{
    //   this.hasRated(res.result);
    // });
  }

  public getVideoSrc() : SafeUrl{
    console.log('Sanitizing URL');
    return this.videoUrl
  }

  getTimestamp(){
    let date = new Date(parseInt(this.video._id.toString().slice(0,8), 16)*1000);
    return date;
    // return "on " + date.toLocaleDateString()+" at "+date.toLocaleTimeString();
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
      _id: this.video._id,
      userId: this.currentUser._id,
      class: this.currentUser.class,
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

    // this.videoService.rate(rate).subscribe(res =>{
    //   if (res.success){
    //     this.video.rating = res.result.rating;
    //     if(res.result.currentVote==0){
    //       this.selectedRateButton = "none";
    //     }
    //   }
    // })
  }




  postComment() {
    this.isPostComment=true;
  }

  cancelComment() {
    this.isPostComment=false;
  }
  redirect(){
    this.router.navigate(['/user-profile'], {queryParams: {username: this.video.username}})
  }


  getNewComment(event){
    if(event!=null){
      this.isPostComment=false;
      this.newComment = event;
    }
  }



  deleteVideo() {

    // this.videoService.remove(this.video).subscribe(res =>{
    //   if (res.success){
    //     this.exists = false;
    //     console.log("success");
    //   }
    // })
  }

  //------------------------------------------------------------------------------//

  constructor(private sanitizer: DomSanitizer,
              private router: Router,
              private userService: UserService){

    console.log('Constructing video');
  }


}
