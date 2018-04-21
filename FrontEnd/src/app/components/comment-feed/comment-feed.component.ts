// Angular
import { Component, OnInit, Input }       from '@angular/core';

// Services

@Component({
  selector: 'comment-feed',
  templateUrl: './comment-feed.component.html',
  styleUrls: ['./comment-feed.component.css']
})
export class CommentFeedComponent implements OnInit {

  @Input() video;

  comments = [
    {
      username: "alinuta",
      date: new Date(),
      ownComment: true,
      text: "Quisque lacinia ullamcorper dictum. Nunc nunc purus, dictum id vehicula in," +
      " luctus vel libero. Nunc odio eros, scelerisque sed sem sit amet"
    },
    {
      username: "ktln",
      date: new Date(),
      ownComment: false,
      text: "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae"
    },
    {
      username: "babe",
      date: new Date(),
      ownComment: false,
      text: "Nulla iaculis ante sit amet facilisis iaculis. " +
      "Donec quis arcu orci. Aenean et mollis lectus, sit amet blandit neque"
    },
    {
      username: "alinuta",
      date: new Date(),
      ownComment: true,
      text: "Cras facilisis ultricies ornare." +
      " Maecenas nec felis urna. Donec quis tempor nisi, at tempor dui." +
      " Donec eu neque ut tortor pellentesque sodales sit amet at lacus."
    },
    {
      username: "scumpiScumpi",
      date: new Date(),
      ownComment: false,
      text: "Donec auctor aliquet tellus, vel accumsan odio placerat vel." +
      " Lorem ipsum dolor sit amet, " +
      "consectetur adipiscing elit. Duis dapibus sit amet eros et dictum."
    },
    {
      username: "barbatelul tau",
      date: new Date(),
      ownComment: false,
      text: "Cras."
    },
    {
      username: "borsec",
      date: new Date(),
      ownComment: false,
      text: "Integer eget nunc ut orci placerat venenatis." +
      " Praesent sed purus tempus, sollicitudin nisi tincidunt, " +
      "facilisis magna. Morbi sed dolor in orci volutpat cursus. " +
      "Aenean cursus eget sem ut dictum. Donec tincidunt venenatis bibendum." +
      " Aenean feugiat vulputate auctor. Quisque congue suscipit porta."
    },
    {
      username: "alinuta",
      date: new Date(),
      ownComment: true,
      text: "Cras facilisis ultricies ornare."
    }
  ]

  ngOnInit() {
  }

  constructor(
  ) { }

}
