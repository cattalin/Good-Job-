// Angular
import { Component, OnInit, Input }       from '@angular/core';

// Services

@Component({
  selector: 'new-comment',
  templateUrl: './new-comment.component.html',
  styleUrls: ['./new-comment.component.css']
})
export class NewCommentComponent implements OnInit {

  @Input() video;

  ngOnInit() {
  }

  constructor(
  ) { }

}
