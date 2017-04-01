import { TestBed, inject } from '@angular/core/testing';

import { SubmitVideoService } from './submit-video.service';

describe('SubmitVideoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SubmitVideoService]
    });
  });

  it('should ...', inject([SubmitVideoService], (service: SubmitVideoService) => {
    expect(service).toBeTruthy();
  }));
});
