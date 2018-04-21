//Angular
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// Components
import { SearchComponent } from './search/search.component';
import { SafePipe, VideoComponent } from './video/video.component';
import { PaginationComponent } from './pagination/pagination.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  declarations: [
    SafePipe,
    SearchComponent,
    VideoComponent,
    PaginationComponent
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,

    SearchComponent,
    VideoComponent,
    PaginationComponent
  ],
  providers: [],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class ComponentsModule {
  cosntructor(){
    console.warn('Constructing ComponentsModule');
  }
}
