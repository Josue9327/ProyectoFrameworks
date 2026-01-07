import { TestBed } from '@angular/core/testing';

import { TipoCitaService } from './tipo-cita.service';

describe('TipoCitaService', () => {
  let service: TipoCitaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipoCitaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
