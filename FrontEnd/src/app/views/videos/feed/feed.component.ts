import {Component, OnChanges, OnInit, Input} from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { VideoService } from 'app/core/api/video.service';
import { UserService } from 'app/core/api/user.service';

@Component({
  selector: 'app-feed',
  templateUrl: 'feed.component.html',
  styleUrls: ['feed.component.css']
})
export class FeedComponent implements OnInit {

  @Input() userName?;

  currentUser: any;
  feed: any;

  //------------------------------------------------------------------------------//

  ngOnInit() {

    this.currentUser = this.getCurrentUser();
    if(this.userName) {
      this.requestItemsByUsername();
    }

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

  requestItemsByUsername() {
    this.criteria.filter.criteria="username";
    this.criteria.filter.searchedContent=this.userName;
    this.feedHandler();
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
      this.getUserRating(res.videos.results);
      let x = document.querySelector ( "#top" );
      if ( x ) {
        x.scrollIntoView ();
      }
    });
  }

  //------------------------------------------------------------------------------//

  getUserRating(videoFeed) {

    videoFeed.forEach(video=>{
        this.videoService.hasRated(video._id).subscribe(res=>{
          video.userRating=res.userRating;
        }, err=>{
          console.error("Error. Get hasRated failed.");
        })
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
        } else {
          this.criteria.filter.searchedContent = '';
          this.criteria.filter.criteria = '';
        }
        this.feedHandler();
      }
    })
  }

}
