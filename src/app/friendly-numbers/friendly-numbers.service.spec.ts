import { TestBed, inject } from '@angular/core/testing';

import { FriendlyNumbersService } from './friendly-numbers.service';

describe('FriendlyNumbersService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FriendlyNumbersService]
    });
  });

  it('should be created', inject([FriendlyNumbersService], (service: FriendlyNumbersService) => {
    expect(service).toBeTruthy();
  }));
});
