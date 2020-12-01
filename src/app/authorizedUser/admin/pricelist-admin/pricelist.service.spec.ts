import { TestBed } from '@angular/core/testing';

import { PricelistAdminService } from './pricelist.service';

describe('PricelistService', () => {
  let service: PricelistAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PricelistAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
