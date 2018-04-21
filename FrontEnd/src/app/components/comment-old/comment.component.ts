import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { SubmitVideoService } from '../../services/submit-video.service';


@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  @Input() comment: any;
   @Input() user: any;
  isMyComment=false;

  constructor(private submitVideoService :SubmitVideoService,
  private router: Router) { }

  ngOnInit(){
    if(this.comment.username===this.user.username)
    this.isMyComment=true;
  }


  getTimestamp(){
    if(this.comment._id!=null){
      let date = new Date(parseInt(this.comment._id.toString().slice(0,8), 16)*1000);
      return "on " + date.toLocaleDateString()+" at "+date.toLocaleTimeString();;
    }
    else {
      return "right now";
    }
    
  }

  redirect(){
    this.router.navigate(['/user-profile'], {queryParams: {username: this.comment.username}})
  }

 deleteComment() {
    this.submitVideoService.remove(this.comment).subscribe(res =>{
          if (res.success){
            console.log("success");
          }
        })
  }

}
