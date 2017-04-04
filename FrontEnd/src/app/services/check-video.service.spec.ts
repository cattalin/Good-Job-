import { TestBed, inject } from '@angular/core/testing';

import { CheckVideoService } from './check-video.service';

describe('CheckVideoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CheckVideoService]
    });
  });

  it('should ...', inject([CheckVideoService], (service: CheckVideoService) => {
    expect(service).toBeTruthy();
  }));
});
