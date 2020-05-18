import { TestBed } from '@angular/core/testing';

import { InMemoryServiceService } from './in-memory-service.service';

describe('InMemoryServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InMemoryServiceService = TestBed.get(InMemoryServiceService);
    expect(service).toBeTruthy();
  });
});
