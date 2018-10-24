import { TestBed, inject } from '@angular/core/testing';

import { MercadoLibreService } from './mercado-libre.service';

describe('MercadoLibreService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MercadoLibreService]
    });
  });

  it('should be created', inject([MercadoLibreService], (service: MercadoLibreService) => {
    expect(service).toBeTruthy();
  }));
});
