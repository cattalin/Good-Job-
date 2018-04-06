import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { VideoService } from 'app/core/api/video.service';
import { UserService } from 'app/core/api/user.service';

@Component({
  templateUrl: 'feed.component.html',
  styleUrls: ['feed.component.css']
})
export class FeedComponent implements OnInit {

  currentUser: any;

  feed: any;
  criteria = {
    filter: {
      criteria: "",
      searchedContent: "asd"
    },
    pagination: {
      limit: 10,
      skip: 0,
      sort: -1
    }
  }

  //------------------------------------------------------------------------------//

  ngOnInit() {

    this.currentUser=this.userService.currentUser;

    this.videoService.getVideoFeed(this.criteria).subscribe(res=>{
      this.feed=res.videos.results;
    });

  }

  //------------------------------------------------------------------------------//

  constructor(private router: Router,
              private route: ActivatedRoute,
              private videoService: VideoService,
              private userService: UserService
  ) { }

}
