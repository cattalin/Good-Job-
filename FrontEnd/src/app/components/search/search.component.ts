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
      this.router.navigate(['/search'], {queryParams:SearchQuery});
    }
    else
    {
      console.log("EMPTY");
    }
  }
/*
  checktags(){

    if(!this.loaded)
    {
      this.searchService.grabTags().subscribe(
          result=>result.tags.forEach(tg=>{
            this.Tags.push(tg);
          })
        );
      this.loaded = true;
    }
  }
*/
}
