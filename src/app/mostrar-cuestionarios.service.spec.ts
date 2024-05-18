import { TestBed } from '@angular/core/testing';

import { MostrarCuestionariosService } from './mostrar-cuestionarios.service';

describe('MostrarCuestionariosService', () => {
  let service: MostrarCuestionariosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MostrarCuestionariosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
