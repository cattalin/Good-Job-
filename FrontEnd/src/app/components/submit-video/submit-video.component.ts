import { Component, OnInit } from '@angular/core';
import {CheckVideoService} from '../../services/check-video.service';
import {SubmitVideoService} from '../../services/submit-video.service';

@Component({
  selector: 'submit-video',
  templateUrl: './submit-video.component.html',
  styleUrls: ['./submit-video.component.css']
})
export class SubmitVideoComponent implements OnInit {
  url: String;
  description :String;
  rating : number;
  constructor(private checkVideoService :CheckVideoService, private submitVideoService :SubmitVideoService) { }

  ngOnInit() {
  }
  submitVideo(){
    if(this.rating==undefined)
      console.log("Rate please");
    if(!this.checkVideoService.checkURL(this.url)){
      console.log("Incorecte link");
    }
    else{
      console.log(Date());
      const toSend={
        user:null,//put user here
        videourl:this.url,
        description:this.description,
        rating:this.rating
      }
      console.log("trying");
      this.submitVideoService.submitVideo(toSend).subscribe(data=>{
        if(!true){

        } 
        else{
          console.log("fail");
        }
      });
    }
  }
}
