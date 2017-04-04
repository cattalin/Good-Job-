import { Component, OnInit } from '@angular/core';
import { VideoFeedService } from '../../services/videofeed/video-feed.service';
import { VideoData } from '../../models/video-data';
@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {

  private q = {
  sort:   '-id',
  select: null,
  limit:  1000,
  skip:   0,
  from:   null,
  to:     null
};

  videos: VideoData[];
  constructor(private adService: VideoFeedService) {}
  ngOnInit() {
    this.videos = this.adService.getVideos(this.q);
  }

}
