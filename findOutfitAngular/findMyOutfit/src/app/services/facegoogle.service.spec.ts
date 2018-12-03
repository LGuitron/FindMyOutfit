import { TestBed, inject } from '@angular/core/testing';

import { FacegoogleService } from './facegoogle.service';

describe('FacegoogleService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FacegoogleService]
    });
  });

  it('should be created', inject([FacegoogleService], (service: FacegoogleService) => {
    expect(service).toBeTruthy();
  }));
});
