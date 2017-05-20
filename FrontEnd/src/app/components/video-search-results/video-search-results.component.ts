import { Component, OnInit, Input } from '@angular/core';
import { AuthenticateService } from '../../services/authenticate.service';
import { SearchService } from '../../services/search.service';
import { ActivatedRoute } from '@angular/router';
import { VideoData } from '../../models/video-data';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-video-search-results',
  templateUrl: './video-search-results.component.html',
  styleUrls: ['./video-search-results.component.css']
})
export class VideoSearchResultsComponent implements OnInit {

  public query: string;
  currentUser: any;
  
	constructor(private route: ActivatedRoute,
              private searchService :SearchService,
              private authService:AuthenticateService,){
  }

 
ngOnInit() {
  this.currentUser = {
      _id: "",
      class: "",
      username: ""
    }
    this.authService.getProfile().subscribe(profile => {
    this.currentUser._id = profile.user._id;
    this.currentUser.class = profile.user.class;
    this.currentUser.username = profile.user.username;
    
    this.route.queryParams.subscribe(params => {
      this.query = params['title'];
      })
    })
  }
}