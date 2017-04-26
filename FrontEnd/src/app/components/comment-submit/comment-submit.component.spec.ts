import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentSubmitComponent } from './comment-submit.component';

describe('CommentSubmitComponent', () => {
  let component: CommentSubmitComponent;
  let fixture: ComponentFixture<CommentSubmitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommentSubmitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentSubmitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
