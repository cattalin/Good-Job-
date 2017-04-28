import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitVideoComponent } from './submit-video.component';

describe('SubmitVideoComponent', () => {
  let component: SubmitVideoComponent;
  let fixture: ComponentFixture<SubmitVideoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubmitVideoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmitVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
