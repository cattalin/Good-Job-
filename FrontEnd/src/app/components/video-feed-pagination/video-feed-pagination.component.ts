import { Component, OnInit, Input, Output, OnChanges, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-video-feed-pagination',
  templateUrl: './video-feed-pagination.component.html',
  styleUrls: ['./video-feed-pagination.component.css']
})
export class VideoFeedPaginationComponent implements OnInit {

  @Input() nrVideos: number;
  @Output() paginationEvent = new EventEmitter<any>();
  pages: number[] = [];
  @Input() selectedPage: number = 1;
  constructor() { }

  ngOnInit() {
    if(this.nrVideos !=0){
      for (let i = 1; i<this.nrVideos/5+1; i++)
        this.pages.push(i);
    }
  }

  ngOnChanges(){
    console.log("vids" + this.nrVideos);
    if(this.nrVideos !=0 && this.pages.length<2){
      for (let i = 1; i<this.nrVideos/5+1; i++)
        this.pages.push(i);
    }

    
  }

  pageChanged(event){console.log("asd");
    this.selectedPage = event.target.innerHTML;

    let newPagination = {
      limit:  5,    //the maximum number of results
      skip:   (this.selectedPage-1)*5      //skipping x docs
    }
    console.log(newPagination);
    this.paginationEvent.emit(newPagination);
    
  }
}
