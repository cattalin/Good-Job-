import { Component, Input, OnInit, SecurityContext } from '@angular/core';
import { VideoData } from '../../models/video-data';
import { DomSanitizer, SafeUrl} from '@angular/platform-browser';
import { FormsModule, FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { VideoFeedService } from '../../services/videofeed/video-feed.service';



@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit {

  isPostComment=false;

  @Input() data: VideoData;
  @Input() user: any;
  private safeLink: SafeUrl;
  constructor(private sanitizer: DomSanitizer,
              private videoService: VideoFeedService){ }


  ngOnInit() {
    this.safeLink = this.sanitizer.bypassSecurityTrustResourceUrl("https://www.youtube.com/embed/"+this.data.link);
  }

  public get getCode() : SafeUrl{
    return this.safeLink;
    //return this.sanitizer.bypassSecurityTrustResourceUrl("https://www.youtube.com/embed/"+this.data.link);
    //Should have been this but it doesn t work for some reason
    //return this.sanitizer.sanitize(SecurityContext.URL, "https://www.youtube.com/embed/"+this.data.link);
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

}
