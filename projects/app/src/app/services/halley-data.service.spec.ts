import { TestBed } from '@angular/core/testing';

import { HalleyDataService } from './halley-data.service';

describe('HalleyDataService', () => {
  let service: HalleyDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HalleyDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
