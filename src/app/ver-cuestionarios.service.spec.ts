import { TestBed } from '@angular/core/testing';

import { VerCuestionariosService } from './ver-cuestionarios.service';

describe('VerCuestionariosService', () => {
  let service: VerCuestionariosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VerCuestionariosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
