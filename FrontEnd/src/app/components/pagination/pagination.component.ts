import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';

import { PaginationService } from 'app/core/services/pagination.service';

@Component({
  selector: 'app-pagination',
  templateUrl: 'pagination.component.html',
  styleUrls: ['pagination.component.css'],
  providers: [ PaginationService ]
})
export class PaginationComponent implements OnInit, OnChanges {

  @Input() count;
  @Output() selection: EventEmitter<any> = new EventEmitter<any>();

  currentPage = 0;
  setOfItems=[{number: 10}, {number: 20}, {number: 30}];
  selectedSetOfItems = this.setOfItems[0];
  startIndexForPages=0;
  numberOfPages;
  pages = [];

  //------------------------------------------------------------------------------//

  ngOnInit() {

    this.paginationService.setNumberOfItems(this.count);
    this.pages = this.paginationService.getPages();
    this.numberOfPages = this.pages.length;

  }

  ngOnChanges() {

    this.paginationService.setNumberOfItems(this.count);
    this.pages = this.paginationService.getPages();
    this.numberOfPages = this.pages.length;
  }

  //------------------------------------------------------------------------------//

  setPage(selectedPage) {

    this.currentPage=selectedPage;
    this.paginationService.setCurrentPage(selectedPage);
    this.startIndexForPages = this.paginationService.getStartIndexForPagesNextAndSet();
    this.selection.emit({currentPage: this.currentPage, selectedSetOfItems: this.selectedSetOfItems});
  }

  //------------------------------------------------------------------------------//

  prevPage() {

    if(this.currentPage > 0)
      this.currentPage--;

    this.paginationService.setCurrentPage(this.currentPage);
    this.startIndexForPages = this.paginationService.getStartIndexForPagesPrev();
    this.selection.emit({currentPage: this.currentPage, selectedSetOfItems: this.selectedSetOfItems});
  }

  //------------------------------------------------------------------------------//

  nextPage() {
    if(this.currentPage < this.numberOfPages-1)
      this.currentPage++;

    this.paginationService.setCurrentPage(this.currentPage);
    this.startIndexForPages = this.paginationService.getStartIndexForPagesNextAndSet();
    this.selection.emit({currentPage: this.currentPage, selectedSetOfItems: this.selectedSetOfItems});
  }

  //------------------------------------------------------------------------------//

  selectNumberOfItems(selected) {

    this.currentPage=0;
    this.selectedSetOfItems={number: selected};
    this.startIndexForPages=0;

    this.paginationService.setCurrentPage(0);
    this.paginationService.setSelectedSetOfItems(this.selectedSetOfItems);
    this.paginationService.setStartIndexForPages(0);
    this.pages = this.paginationService.getPages();
    this.selection.emit({currentPage: this.currentPage, selectedSetOfItems: this.selectedSetOfItems});
  }

  //------------------------------------------------------------------------------/

  constructor(private paginationService: PaginationService) { }

}
