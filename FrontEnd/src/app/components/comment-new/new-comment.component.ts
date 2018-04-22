// Angular
import { Component, OnInit, Input }       from '@angular/core';

// Services
import { CommentService }                 from 'app/core/api/comment.service';

@Component({
  selector: 'new-comment',
  templateUrl: './new-comment.component.html',
  styleUrls: ['./new-comment.component.css']
})
export class NewCommentComponent implements OnInit {

  @Input() video;
  text: string = '';

  //-----------------------------------------------------------------------------//

  ngOnInit() {

  }

  //-----------------------------------------------------------------------------//

  submit() {

    this.commentService.newComment({text: this.text, videoId: this.video._id})
      .subscribe(res=>{

      },err=>{

      });
  }

  //-----------------------------------------------------------------------------//

  constructor(
    private commentService: CommentService
  ) { }

}
