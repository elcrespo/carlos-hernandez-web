import { TestBed } from '@angular/core/testing';

import { UserSearchDisplayerService } from './user-search-displayer.service';

describe('UserSearchDisplayerService', () => {
  let service: UserSearchDisplayerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserSearchDisplayerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
