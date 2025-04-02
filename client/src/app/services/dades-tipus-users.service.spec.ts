import { TestBed } from '@angular/core/testing';

import { DadesTipusUsersService } from './dades-tipus-users.service';

describe('DadesTipusUsersService', () => {
  let service: DadesTipusUsersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DadesTipusUsersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
