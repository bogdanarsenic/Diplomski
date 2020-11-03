import { TestBed } from '@angular/core/testing';

import { LinesAdminService } from './lines-admin.service';

describe('LinesAdminService', () => {
  let service: LinesAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LinesAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
