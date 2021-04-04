import { TestBed } from '@angular/core/testing';

import { TameteoService } from './tameteo.service';

describe('TameteoService', () => {
  let service: TameteoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TameteoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
