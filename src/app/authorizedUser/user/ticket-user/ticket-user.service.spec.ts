import { TestBed } from '@angular/core/testing';

import { TicketUserService } from './ticket-user.service';

describe('TicketUserService', () => {
  let service: TicketUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TicketUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
