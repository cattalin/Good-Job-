import { Component, OnInit, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: 'pagination.component.html',
  styleUrls: ['pagination.component.css']
})
export class PaginationComponent implements OnInit {

  @Input() count;

  currentPage = 0;
  setOfItems=[{number: 10}, {number: 20}, {number: 30}];
  selectedSetOfItems= this.setOfItems[0];
  startIndexForPages=0;
  numberOfPages;
  pages = [];

  //------------------------------------------------------------------------------//

  ngOnInit() {

    this.computePages();

  }

  //------------------------------------------------------------------------------//

  setPage(selectedPage) {
    this.currentPage=selectedPage;
    this.setStartIndexForPagesForNextAndSet();
  }

  //------------------------------------------------------------------------------//

  prevPage() {
    if(this.currentPage > 0)
      this.currentPage--;

    if(this.currentPage < 3) this.startIndexForPages = 0;
    else if(this.currentPage==this.numberOfPages-2) this.startIndexForPages=this.currentPage-3;
    else this.startIndexForPages=this.currentPage-2;
  }

  //------------------------------------------------------------------------------//

  nextPage() {
    if(this.currentPage < this.numberOfPages-1)
      this.currentPage++;

    this.setStartIndexForPagesForNextAndSet();
  }

  //------------------------------------------------------------------------------//

  setStartIndexForPagesForNextAndSet() {

    if(this.currentPage<=2) this.startIndexForPages=0;
    else if(this.currentPage+1>this.numberOfPages) this.startIndexForPages=this.numberOfPages-5 >= 0 ? this.numberOfPages-5 : 0;
    else this.startIndexForPages=this.currentPage-2;
  }

  //------------------------------------------------------------------------------//

  computePages() {
    this.pages=[];
    this.numberOfPages = Math.ceil(this.count/this.selectedSetOfItems.number);

    var i=0;
    while(i < this.numberOfPages)
      this.pages.push(i++);  }

  //------------------------------------------------------------------------------//

  selectNumberOfItems(selected) {

    this.currentPage=0;
    this.selectedSetOfItems={number: selected};
    this.computePages();
    this.startIndexForPages=0;
  }

  //------------------------------------------------------------------------------/

  constructor() { }

}
