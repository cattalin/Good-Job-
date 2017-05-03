import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  @Input() comment: any;

  constructor() { }

  ngOnInit() {

  }


  getTimestamp() {
    let date = new Date(parseInt(this.comment._id.toString().slice(0,8), 16)*1000);
    return "on " + date.toLocaleDateString()+" at "+date.toLocaleTimeString();;
  }

}
