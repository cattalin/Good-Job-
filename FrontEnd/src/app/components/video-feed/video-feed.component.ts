import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { VideoFeedService } from '../../services/videofeed/video-feed.service';
import { VideoData } from '../../models/video-data';
import { HttpModule } from '@angular/http';

@Component({
  selector: 'app-video-feed',
  templateUrl: './video-feed.component.html',
  styleUrls: ['./video-feed.component.css']
})
export class VideoFeedComponent implements OnInit, OnChanges {
  
  @Input() currentUser: any;//here should be a user class
  @Input() query: any = {
    sort:   '_id',  //user to sort out of database
    select: null,   //filter the results(example:   select:"username:catalin"")
    followerId:null,//only use for searching the videos of the users that one user follows(following system)
    limit:  100,    //the maximum number of results
    skip:   0      //skipping x docs
}; 
  videos: VideoData[] = [];
  
  
  
  constructor(private videoService: VideoFeedService) {
      this.query=null;
  }
  
  ngOnInit() {
    this.requestVideos();
  }

  ngOnChanges(){
    this.requestVideos();
  }


  requestVideos(){
    this.videos=null;
    this.videoService.getVideos(this.query).subscribe(vids => {this.videos=vids;});
  }


}
