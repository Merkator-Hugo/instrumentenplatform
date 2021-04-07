import { TestBed } from '@angular/core/testing';

import { AstronomyService } from './astronomy.service';

describe('AstronomyService', () => {
  let service: AstronomyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AstronomyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
