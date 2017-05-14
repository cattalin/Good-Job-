import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  @Input() comment: any;

  constructor(private router: Router) { }

  ngOnInit(){

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
}
