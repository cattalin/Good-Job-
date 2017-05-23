import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { VideoFeedService } from '../../services/videofeed/video-feed.service';

@Component({
  selector: 'app-comment-feed',
  templateUrl: './comment-feed.component.html',
  styleUrls: ['./comment-feed.component.css']
})
export class CommentFeedComponent implements OnInit, OnChanges {

  @Input() videoId: String;
  @Input() newComment: any;
  @Input() user: any;
  comments: any[] = []
  isShowComments = false;

  constructor(private videoService: VideoFeedService) { }

  ngOnInit() {
    if(this.videoId)
      this.videoService.getComments({videoId: this.videoId}).subscribe(
        comms => {
          this.comments = comms;
        });
  }

  ngOnChanges(){
    if (this.newComment!=null){
      this.comments.push(this.newComment);
    }
  }



  toggleComments() {
  if(this.isShowComments===false)
        this.isShowComments=true;
  else this.isShowComments=false;
  }
}
