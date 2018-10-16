import { TestBed, inject } from '@angular/core/testing';

import { ClarifaiService } from './clarifai.service';

describe('ClarifaiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ClarifaiService]
    });
  });

  it('should be created', inject([ClarifaiService], (service: ClarifaiService) => {
    expect(service).toBeTruthy();
  }));
});
