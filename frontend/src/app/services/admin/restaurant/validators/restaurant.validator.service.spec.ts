import { TestBed } from '@angular/core/testing';

import { RestaurantValidatorService } from './restaurant.validator.service';

describe('RestaurantValidatorService', () => {
  let service: RestaurantValidatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RestaurantValidatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
