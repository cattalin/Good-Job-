import { Injectable } from '@angular/core';

Injectable()
export class PaginationService {

  private numberOfItems;
  private currentPage = 0;
  private setOfItems=[{number: 10}, {number: 20}, {number: 30}];
  private selectedSetOfItems= this.setOfItems[0];
  private startIndexForPages=0;
  private numberOfPages;
  private pages = [];

  //------------------------------------------------------------------------------//

  computePages() {

    this.pages=[];
    this.numberOfPages = Math.ceil(this.numberOfItems/this.selectedSetOfItems.number);

    var i=0;
    while(i < this.numberOfPages)
      this.pages.push(i++);
  }

  //------------------------------------------------------------------------------//

  getPages() {
    this.computePages();
    return this.pages;
  }

  //------------------------------------------------------------------------------//

  setCurrentPage(page) {
    this.currentPage = page;
  }

  //------------------------------------------------------------------------------//

  getCurrentPage() {
    return this.currentPage;
  }

  //------------------------------------------------------------------------------//

  getStartIndexForPagesNextAndSet() {

    if(this.currentPage<=2) this.startIndexForPages=0;
    else if(this.currentPage+1>this.numberOfPages) this.startIndexForPages=this.numberOfPages-5 >= 0 ? this.numberOfPages-5 : 0;
    else this.startIndexForPages=this.currentPage-2;

    return this.startIndexForPages;
  }

  //------------------------------------------------------------------------------//

  getStartIndexForPagesPrev() {

    if(this.currentPage < 3) this.startIndexForPages = 0;
    else if(this.currentPage==this.numberOfPages-2) this.startIndexForPages=this.currentPage-3;
    else this.startIndexForPages=this.currentPage-2;

    return this.startIndexForPages;
  }

  //------------------------------------------------------------------------------//

  setStartIndexForPages(index) {
    this.startIndexForPages = index;
  }

  //------------------------------------------------------------------------------//

  setNumberOfItems(count) {
    this.numberOfItems = count;
  }

  //------------------------------------------------------------------------------//

  getNumberOfItems() {
    return this.numberOfItems;
  }

  //------------------------------------------------------------------------------//

  setSelectedSetOfItems(setOfItems) {
    this.selectedSetOfItems = setOfItems;
  }

  //------------------------------------------------------------------------------//

  getSelectedSetOfItems() {
    return this.selectedSetOfItems;
  }

}
