import { TestBed } from '@angular/core/testing';

import { DadesPartidasService } from './dades-partidas.service';

describe('DadesPartidasService', () => {
  let service: DadesPartidasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DadesPartidasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
