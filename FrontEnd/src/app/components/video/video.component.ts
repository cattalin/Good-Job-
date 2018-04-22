// Angular
import {
  Component, Input, OnInit,
  Pipe, PipeTransform
}                                from '@angular/core';
import { Router }                from '@angular/router';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

//rxjs
import { Subscription }          from 'rxjs/Subscription';

// Services
import { UserService }           from 'app/core/api/user.service';
import { VideoService }          from 'app/core/api/video.service';
import { CommentHandlerService } from 'app/core/services/comment-handler.service';
import { CommentService }        from 'app/core/api/comment.service';


@Pipe({name: 'safe'})
export class SafePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {
    console.log('Constructing Pipe')
  }

  transform(url): SafeUrl {
    console.log('Sanitizing URL: ' + url);
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css'],
  providers: [CommentHandlerService]
})

export class VideoComponent implements OnInit {

  @Input() video;
  currentUser;
  numberOfComments;


  newComment: any = null;
  selectedRateButton: String = "none";
  exists = true;
  isPostComment = false;

  ngOnInit() {
    console.log('Initing video');
    this.currentUser = this.userService.currentUser;
    this.commentService.getNumberOfComments(this.video._id).subscribe(res=>{
      this.numberOfComments = res.count;
    }, err=>{
      //TODO:
    })

    this.ratingManager(); //TODO: refactor
    this.isPostComment = false; //TODO: rename

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

  getTimestamp(){
    let date = new Date(parseInt(this.video._id.toString().slice(0,8), 16)*1000);
    return date;
  }

  hasRated(value) {
    switch (value) {
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


  rate(event) {
    const rate = {
      _id: this.video._id,
      userId: this.currentUser._id,
      class: this.currentUser.class,
      rating: 0
    }


    switch (event.currentTarget.id) {
      case 'gj':
        this.selectedRateButton = "gj";
        rate.rating = 5;
        break;
      case 'cool':
        this.selectedRateButton = "cool";
        rate.rating = 3;
        break;
      case 'meh':
        this.selectedRateButton = "meh";
        rate.rating = 1;
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

  redirect() {
    this.router.navigate(['/user-profile'], {queryParams: {username: this.video.username}})
  }

  //------------------------------------------------------------------------------//

  displayNewComment: boolean = false;
  toggleNewComment() {
    this.displayNewComment=!this.displayNewComment;
  }

  //------------------------------------------------------------------------------//

  displayComments: boolean = false;
  toggleComments() {
    this.displayComments=!this.displayComments;
    if(!this.displayComments) this.displayNewComment=false;
  }

  //------------------------------------------------------------------------------//

  deleteVideo() {

    window.confirm("Are you sure you want to delete this video?");
    if (confirm) {
      this.videoService.delete(this.video._id).subscribe(res =>{
        if (res.code==200){
          this.exists = false;
          console.log("Video deleted.");
        }
      })
    } else {
      //TODO:
    }
  }

  //------------------------------------------------------------------------------//
  subscription: Subscription;
  comment: any;

  constructor(private sanitizer: DomSanitizer,
              private router: Router,
              private commentHandlerService: CommentHandlerService,
              private videoService: VideoService,
              private commentService: CommentService,
              private userService: UserService) {
    console.log('Constructing video');

    this.subscription = commentHandlerService.newComment$.subscribe(
      comment => {
        this.comment = comment;
      });
  }


}
