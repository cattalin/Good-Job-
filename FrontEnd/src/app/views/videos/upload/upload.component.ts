import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FlashMessagesService } from 'angular2-flash-messages';
import { VideoService } from 'app/core/api/video.service';

@Component({
  templateUrl: 'upload.component.html',
  styleUrls: ['upload.component.css']
})
export class UploadComponent implements OnInit {

  video: FormGroup;

  //------------------------------------------------------------------------------//

  ngOnInit() {

    this.formHandler();
  }

  //------------------------------------------------------------------------------//

  get link() { return this.video.get('link'); }
  get title() { return this.video.get('title'); }
  get description() { return this.video.get('description'); }
  get rating() { return this.video.get('rating'); }

  //------------------------------------------------------------------------------//

  formHandler() {
    this.video = this.formBuilder.group({
      link: ['', Validators.required],
      title: ['', Validators.required],
      description: ['', Validators.required],
      rating: [null, Validators.required]
    });
  }

  //------------------------------------------------------------------------------//

  rate(rating) {
    this.rating.patchValue(rating);
  }

  //------------------------------------------------------------------------------//

  submit() {

    this.video.disable();
    this.videoService.uploadVideo(this.video.value).subscribe(res=>{
      this.flashMessage.show('Success!', {
        cssClass: 'alert-success',
        timeout: 5000});
      setTimeout(()=>{
        this.router.navigate(["/videos"]);
      }, 5000)
    },err=>{
      this.video.enable();
      this.flashMessage.show('There was an error. Please try again.', {
        cssClass: 'alert-danger',
        timeout: 5000});
    });
  }

  //------------------------------------------------------------------------------//

  constructor(private router: Router,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private flashMessage: FlashMessagesService,
              private videoService: VideoService
  ) { }

}
