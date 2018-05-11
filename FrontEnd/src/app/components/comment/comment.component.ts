// Angular
import { Component, OnInit, Input }       from '@angular/core';

// Services
import { UserService }                    from 'app/core/api/user.service';
import { CommentService }                 from 'app/core/api/comment.service';

@Component({
  selector: 'comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  @Input() comment;
  currentUser;

  //------------------------------------------------------------------------------//

  ngOnInit() {
    this.currentUser=this.userService.currentUser;
  }

  //------------------------------------------------------------------------------//

  goToProfile() {

      this.router.navigate([`/users/profile/${this.comment.username}`]);
  }

  //------------------------------------------------------------------------------//

  exists: boolean = true;

  delete() {

    window.confirm("Are you sure you want to delete this comment?");
    if (confirm) {
      this.commentService.deleteComment(this.comment.videoId, this.comment._id).subscribe(res=>{
        this.exists=false;
      }, err=>{

      })
    } else {

    }

  }

  //------------------------------------------------------------------------------//

  constructor(
    private userService: UserService,
    private commentService: CommentService
  ) { }

}
