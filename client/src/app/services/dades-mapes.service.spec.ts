import { TestBed } from '@angular/core/testing';

import { DadesMapesService } from './dades-mapes.service';

describe('DadesMapesService', () => {
  let service: DadesMapesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DadesMapesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
