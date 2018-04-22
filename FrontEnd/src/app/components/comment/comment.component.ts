// Angular
import { Component, OnInit, Input }       from '@angular/core';

// Services

@Component({
  selector: 'comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  @Input() comment;

  ngOnInit() {
  }

  constructor(
  ) { }

}
