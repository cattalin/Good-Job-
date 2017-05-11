import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  public data;
   constructor(private router: Router) {
     this.data = {
       val: ''
     };
    }

  ngOnInit() {
  }


  onSubmit(){
    let SearchQuery;
    SearchQuery = this.data.val;
    if(SearchQuery!=null)
    {
      //this.searchService.GetRequest(this.SearchQuery);
      this.router.navigate(['/search'], {queryParams:{title:SearchQuery}});
    }
    else
    {
      console.log("EMPTY");
    }
  }
}
