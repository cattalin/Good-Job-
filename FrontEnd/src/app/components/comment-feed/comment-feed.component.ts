import { Component, OnInit, Input } from '@angular/core';
import { VideoFeedService } from '../../services/videofeed/video-feed.service';

@Component({
  selector: 'app-comment-feed',
  templateUrl: './comment-feed.component.html',
  styleUrls: ['./comment-feed.component.css']
})
export class CommentFeedComponent implements OnInit {

  @Input() videoId: String;
  comments: any[] = []

  constructor(private videoService: VideoFeedService) { }

  ngOnInit() {
    if(this.videoId)
      this.videoService.getComments({videoId: this.videoId}).subscribe(
        comms => {
          this.comments = comms;
        });
    console.log(this.comments)
  }

}
