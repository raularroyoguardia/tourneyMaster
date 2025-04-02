import { TestBed } from '@angular/core/testing';

import { DadesJocsService } from './dades-jocs.service';

describe('DadesJocsService', () => {
  let service: DadesJocsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DadesJocsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
