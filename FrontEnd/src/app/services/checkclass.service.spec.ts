import { TestBed, inject } from '@angular/core/testing';

import { CheckclassService } from './checkclass.service';

describe('CheckclassService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CheckclassService]
    });
  });

  it('should ...', inject([CheckclassService], (service: CheckclassService) => {
    expect(service).toBeTruthy();
  }));
});
