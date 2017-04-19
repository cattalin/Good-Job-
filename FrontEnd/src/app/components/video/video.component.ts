import { Component, Input, OnInit } from '@angular/core';
import { VideoData } from '../../models/video-data';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit {
  @Input() data:VideoData
  constructor(private sanitizer: DomSanitizer){}

  ngOnInit() {
  }

  getCode(){
    return "https://www.youtube.com/embed/"+this.data.link;
  }

}
