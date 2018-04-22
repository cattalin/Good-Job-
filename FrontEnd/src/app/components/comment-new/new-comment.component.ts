// Angular
import { Component, OnInit, Input }       from '@angular/core';

// Services
import { CommentService }                 from 'app/core/api/comment.service';
import { CommentHandlerService }          from 'app/core/services/comment-handler.service';
import { UserService }                    from 'app/core/api/user.service';

@Component({
  selector: 'new-comment',
  templateUrl: './new-comment.component.html',
  styleUrls: ['./new-comment.component.css'],
  providers: [CommentHandlerService]
})
export class NewCommentComponent implements OnInit {

  @Input() video;
  text: string = '';
  currentUser;

  //-----------------------------------------------------------------------------//

  ngOnInit() {
    this.currentUser=this.userService.currentUser;
  }

  //-----------------------------------------------------------------------------//

  submit() {

    this.commentService.newComment({text: this.text, videoId: this.video._id})
      .subscribe(res=>{
          this.commentHandlerService.addNewComment(res.newComment);
      },err=>{

      });
  }

  //-----------------------------------------------------------------------------//

  constructor(
    private userService: UserService,
    private commentService: CommentService,
    private commentHandlerService: CommentHandlerService
  ) { }

}
