import { TestBed } from '@angular/core/testing';

import { Notification.ServiceService } from './notification.service';

describe('Notification.ServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Notification.ServiceService = TestBed.get(Notification.ServiceService);
    expect(service).toBeTruthy();
  });
});
