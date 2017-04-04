import { Component, OnInit } from '@angular/core';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  public Tags = [];
  loaded = false;
   constructor(private searchService :SearchService) { }

  ngOnInit() {
  }

  checktags(){

    if(!this.loaded)
    {
      this.searchService.grabTags().subscribe(result=>result.tags.forEach(tg=>{this.Tags.push(tg)}));//.subscribe(result=>{console.log("asd"+result);});
      this.loaded = true;
    }else{
     //console.log(this.tags)
    }
  }

}
