import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { VideoService } from 'app/core/api/video.service';

@Component({
  templateUrl: 'feed.component.html',
  styleUrls: ['feed.component.css']
})
export class FeedComponent implements OnInit {


  //------------------------------------------------------------------------------//

  ngOnInit() {

  }

  //------------------------------------------------------------------------------//

  constructor(private router: Router,
              private route: ActivatedRoute,
              private videoService: VideoService
  ) { }

}
