import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PaginationService } from 'app/core/services/pagination.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers: [ PaginationService ]
})
export class SearchComponent implements OnInit {
  public data;
   constructor(private router: Router, private paginationService: PaginationService) {
     this.data = {
       val: ''
     };
    }

  ngOnInit() {
  }

  onSubmit(){

    this.paginationService.setSearchFor(this.data.val);
    console.log(this.data.val.length)
    if(this.data.val.length==0) this.router.navigate([`/videos`]);
    else this.router.navigate([`/videos`], {queryParams:{search:this.data.val}});

  }
}
