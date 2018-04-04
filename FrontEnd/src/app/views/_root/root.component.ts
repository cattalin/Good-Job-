import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'app/core';

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html'
})
export class RootComponent implements OnInit {

  currentUser: any;

  constructor(private authService: AuthenticationService) { }

  ngOnInit() {
    this.authService.getCurrentUser().subscribe(res=>{
      this.currentUser=res;
    });
  }

}
