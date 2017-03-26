import { Injectable } from '@angular/core';
import { VideoComponent } from '../../components/video/video.component';
import { VideoData } from '../../models/video-data';


@Injectable()
export class VideoFeedService {

  constructor() { 

  }

  getVideos(){
    return [
      new VideoData("oprrx0Yjy4U",  "podcastul secolului"),
      new VideoData("Gazp4GpbcAM",  "tutorialu secolului"),
      new VideoData("oprrx0Yjy4U",  "podcastul secolului"),
      new VideoData("Gazp4GpbcAM",  "tutorialu secolului")
    ]
  }

}
