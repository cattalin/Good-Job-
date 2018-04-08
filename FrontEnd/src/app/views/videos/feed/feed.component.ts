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

  //------------------------------------------------------------------------------//

  ngOnInit() {

    this.currentUser = this.getCurrentUser();
    this.feedHandler();

  }

  //------------------------------------------------------------------------------//

  criteriaHandler() {

    return {
      filter: {
        criteria: "",
        searchedContent: ""
      },
      pagination: {
        limit: 10,
        skip: 0,
        sort: -1
      }
    }

  }

count;
  //------------------------------------------------------------------------------//

  feedHandler() {
    var criteria = this.criteriaHandler();
    this.videoService.getVideoFeed(criteria).subscribe(res=>{
      this.feed=res.videos.results;
      this.count=res.count;
    });
  }

  //------------------------------------------------------------------------------//

  getCurrentUser() {
    return this.userService.currentUser;
  }

  //------------------------------------------------------------------------------//

  constructor(private router: Router,
              private route: ActivatedRoute,
              private videoService: VideoService,
              private userService: UserService
  ) { }

}
