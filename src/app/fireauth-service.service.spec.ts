import { TestBed, inject } from '@angular/core/testing';

import { FireauthServiceService } from './fireauth-service.service';

describe('FireauthServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FireauthServiceService]
    });
  });

  it('should be created', inject([FireauthServiceService], (service: FireauthServiceService) => {
    expect(service).toBeTruthy();
  }));
});
