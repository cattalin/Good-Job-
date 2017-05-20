import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { VideoFeedService } from '../../services/videofeed/video-feed.service';
import { VideoData } from '../../models/video-data';
import { HttpModule } from '@angular/http';
import { SearchService } from '../../services/search.service';
import { ActivatedRoute } from '@angular/router';

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
    followerId: null,//only use for searching the videos of the users that one user follows(following system)
  };
  paginationQuery = {
    limit:  5,    //the maximum number of results
    skip:   0      //skipping x docs
  }
  selectedPage: number = 1;

  @Input() searchMode = false;
  videos: VideoData[] = [];
  nrVideos: number = 0;
  
  
  constructor(private videoService: VideoFeedService,
              private route: ActivatedRoute,
              private searchService :SearchService) {
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
    if(!this.searchMode){
      this.videoService.countVideos(this.query).subscribe(nrVideos => {
        this.nrVideos = nrVideos;
        let currentQuery = {
          sort:   this.query.sort, 
          select: this.query.select,  
          followerId: this.query.followerId,
          limit:  this.paginationQuery.limit,
          skip:   this.paginationQuery.skip
        }
        this.videoService.getVideos(currentQuery).subscribe(vids => {this.videos=vids;});
      })
    }
      
    else {
      this.route.queryParams.subscribe(params => {
        let currentQuery = {
            sort:   '_id', 
            select: params['title'],  
            followerId: null,
            limit:  this.paginationQuery.limit,
            skip:   this.paginationQuery.skip
          }
        this.videoService.countSearchedVideos(currentQuery).subscribe(nrVideos => {
          this.nrVideos = nrVideos;
          currentQuery.limit = this.paginationQuery.limit;
          currentQuery.skip = this.paginationQuery.skip;
          return this.videoService.searchVideos(currentQuery).subscribe(vids=> {this.videos = vids;})
        })
      })
    }
  }

  getPaginationQuery(event){
    if(event!=null){
      
      this.paginationQuery = event;
      this.selectedPage = this.paginationQuery.skip/5+1;
      this.requestVideos();
    }
  }
}

