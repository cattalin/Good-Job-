import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentFeedComponent } from './comment-feed.component';

describe('CommentFeedComponent', () => {
  let component: CommentFeedComponent;
  let fixture: ComponentFixture<CommentFeedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommentFeedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
