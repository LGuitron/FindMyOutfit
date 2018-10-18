import { TestBed, inject } from '@angular/core/testing';

import { ImageTransferService } from './image-transfer.service';

describe('ImageTransferService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ImageTransferService]
    });
  });

  it('should be created', inject([ImageTransferService], (service: ImageTransferService) => {
    expect(service).toBeTruthy();
  }));
});
