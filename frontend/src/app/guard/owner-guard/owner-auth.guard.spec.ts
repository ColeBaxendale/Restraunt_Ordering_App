import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { ownerAuthGuard } from './owner-auth.guard';

describe('ownerAuthGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => ownerAuthGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
