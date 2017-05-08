import { Component, OnInit, Input } from '@angular/core';
import { AuthenticateService } from '../../services/authenticate.service';
import { SearchService } from '../../services/search.service';
import { ActivatedRoute} from '@angular/router';
import { VideoData} from '../../models/video-data';
import { Observable } from 'rxjs/Observable';

@Component({
	selector: 'search-feed',
	templateUrl: 'search-feed.component.html',
	styleUrls: ['./search-feed.component.css']
})



export class SearchFeedComponent implements OnInit {
	public sub;
	public query:string;
  @Input() videos: VideoData[] = [];
	constructor( private route: ActivatedRoute,private searchService :SearchService){
  }

 


ngOnInit() {
   this.sub = this.route.queryParams.subscribe(params => {
       this.query = params['title'];
    });
   // alert(this.query);
   return this.searchService.GetRequest(this.query).subscribe(vids=> this.videos = vids);
 
  }

	
	
}
