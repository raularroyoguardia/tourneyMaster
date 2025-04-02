import { TestBed } from '@angular/core/testing';

import { DadesPremisService } from './dades-premis.service';

describe('DadesPremisService', () => {
  let service: DadesPremisService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DadesPremisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
