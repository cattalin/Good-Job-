import { Component, OnInit, Input } from '@angular/core';
import { VideoFeedService } from '../../services/videofeed/video-feed.service';
import { VideoData } from '../../models/video-data';
import { AuthenticateService } from '../../services/authenticate.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {
 
  private q = {
  sort:   '_id',
  select: null,
  limit:  1000,
  skip:   0,
  from:   null,
  to:     null
};

  @Input() videos: VideoData[] = [];
  currentUser: any;//here should be a user class


  constructor(private videoService: VideoFeedService,
              private authService:AuthenticateService) {}


  ngOnInit() {
    this.videoService.getVideos(this.q).subscribe(vids => {this.videos=vids;});
    
    this.currentUser = {
      _id: "",
      class: ""
    }
    //getting the current user data of this session
    this.authService.getProfile().subscribe(profile => {
      this.currentUser._id=profile.user._id;
      this.currentUser.class=profile.user.class;
      console.log(this.currentUser);
    },
    err => {
      console.log(err);
      return false;
    });
  }
}
