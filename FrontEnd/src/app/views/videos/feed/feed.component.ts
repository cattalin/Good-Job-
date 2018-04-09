import {Component, OnChanges, OnInit} from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
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

    var paramId = this.route.snapshot.queryParams['search'];
    if (paramId) {
      this.criteria.filter.searchedContent = paramId;
      this.criteria.filter.criteria = 'search';
      console.log(this.criteria)

    }
    this.feedHandler();

  }

  //------------------------------------------------------------------------------//

  criteria = {
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

  //------------------------------------------------------------------------------//

  requestItems(event) {
    this.criteria.pagination.limit = event.selectedSetOfItems.number;
    this.criteria.pagination.skip = event.selectedSetOfItems.number * event.currentPage;
    this.feedHandler();
  }

  //------------------------------------------------------------------------------//

  count;
  feedHandler() {

    this.videoService.getVideoFeed(this.criteria).subscribe(res=>{
      this.feed=res.videos.results;
      this.count=res.count;
    });
  }

  //------------------------------------------------------------------------------//

  getCurrentUser() {
    return this.userService.currentUser;
  }

  //------------------------------------------------------------------------------//

  constructor(private videoService: VideoService,
              private userService: UserService,
              private router: Router,
              private route: ActivatedRoute
  ) {
    router.events.subscribe(res=> {

      if(res instanceof NavigationEnd) {
        var paramId = this.route.snapshot.queryParams['search'];

        if (paramId) {
          this.criteria.filter.searchedContent = paramId;
          this.criteria.filter.criteria = 'search';
          this.feedHandler();
        }
      }
    })
  }

}
