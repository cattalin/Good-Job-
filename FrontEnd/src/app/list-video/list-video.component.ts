import { Component, OnInit } from '@angular/core';
import {CollectableVideos} from '../shared/collectable.service';

@Component({
  selector: 'app-list-video',
  templateUrl: './list-video.component.html',
  styleUrls: ['./list-video.component.css']
})
export class ListVideoComponent implements OnInit {
  collectables = [];
  getColectables(){
    return this.collectables;
  }
        constructor(private collectableV:CollectableVideos) {
        }

  ngOnInit() {
    this.collectables=this.collectableV.getCollectables();
  }

}
