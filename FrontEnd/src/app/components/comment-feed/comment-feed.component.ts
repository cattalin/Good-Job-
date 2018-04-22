// Angular
import { Component, OnInit, OnChanges, Input }       from '@angular/core';

// Services
import { CommentService }                 from 'app/core/api/comment.service';

@Component({
  selector: 'comment-feed',
  templateUrl: './comment-feed.component.html',
  styleUrls: ['./comment-feed.component.css']
})
export class CommentFeedComponent implements OnInit, OnChanges {

  @Input() video;
  @Input() newComment;
  comments: any = [];

  //-----------------------------------------------------------------------------//

  ngOnInit() {
    this.commentService.getComments(this.video._id).subscribe(res=>{
      this.comments=res.comments;
    }, err=>{

    })
  }

  //-----------------------------------------------------------------------------//

  ngOnChanges() {
    if(this.newComment) this.comments.unshift(this.newComment);
  }

  //-----------------------------------------------------------------------------//

  constructor(
    private commentService: CommentService
  ) { }

}
