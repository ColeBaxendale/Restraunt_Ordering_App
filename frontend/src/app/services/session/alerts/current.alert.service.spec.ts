import { TestBed } from '@angular/core/testing';

import { CurrentAlertService } from './current.alert.service';

describe('CurrentAlertService', () => {
  let service: CurrentAlertService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurrentAlertService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
