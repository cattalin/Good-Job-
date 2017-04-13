import { Component, OnInit } from '@angular/core';
import { AuthenticateService } from '../../services/authenticate.service';


@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css']
})
export class ViewProfileComponent implements OnInit {

  user: any;

  constructor(private authService: AuthenticateService) { }

  ngOnInit() {

  }
}
