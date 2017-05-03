import { Component, OnInit, Input } from '@angular/core';
import { VideoFeedService } from '../../services/videofeed/video-feed.service';
import { VideoData } from '../../models/video-data';
import { AuthenticateService } from '../../services/authenticate.service';
import { CheckclassService } from '../../services/checkclass.service';

@Component({
  selector: 'app-video-feed',
  templateUrl: './video-feed.component.html',
  styleUrls: ['./video-feed.component.css']
})
export class VideoFeedComponent implements OnInit {

  private q = {
    sort:   '_id',
    select: null,
    limit:  1000,
    skip:   0,
    from:   null,
    to:     null
};

  @Input() videos: VideoData[] = [];
  @Input() query: any;

  byRating: boolean = false;

  currentUser: any;//here should be a user class


  constructor(private videoService: VideoFeedService,
              private authService:AuthenticateService,
              private checkclassService : CheckclassService) {
      this.query=null;
    }


  ngOnInit() {
    /*this.authService.getProfile().subscribe(profile => {
        
        }))
        
    },
    err => {
      console.log(err);
      return false;
    });*/

   

    if(this.query)
      this.q.select=this.query.select;

    this.requestVideos();
  }


  toggleByRating() {
    if (this.byRating === true){
      this.q = {
        sort:   '_id',
        select: null, 
        limit:  1000, 
        skip:   0,
        from:   null,
        to:     null
      };
      this.byRating = false;
      this.requestVideos();
    }

    else {
      this.byRating = true;
      this.q = {
        sort:   'rating',
        select: null,
        limit:  1000,
        skip:   0,
        from:   null,
        to:     null
      };
      this.requestVideos();
    }
  }

  requestVideos(){
    this.videoService.getVideos(this.q).subscribe(vids => {this.videos=vids;});

    this.currentUser = {
        _id: "",
        class: "",
        username: ""
      }
      //getting the current user data of this session
      this.authService.getProfile().subscribe(profile => {
        this.currentUser._id = profile.user._id;
        this.currentUser.class = profile.user.class;
        this.currentUser.username = profile.user.username;
        console.log(this.currentUser);




        console.log("id ul secolului este" + this.currentUser._id);
        this.checkclassService.getClassUpdate(this.currentUser).subscribe(newClass => {
              console.log(newClass);
        });





      },
      err => {
      console.log(err);
      return false;
    });
    
  }


}
