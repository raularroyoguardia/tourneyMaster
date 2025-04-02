import { TestBed } from '@angular/core/testing';

import { DadesModeJocsService } from './dades-mode-jocs.service';

describe('DadesModeJocsService', () => {
  let service: DadesModeJocsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DadesModeJocsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
