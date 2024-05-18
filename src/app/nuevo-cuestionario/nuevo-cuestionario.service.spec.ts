import { TestBed } from '@angular/core/testing';

import { NuevoCuestionarioService } from './nuevo-cuestionario.service';

describe('NuevoCuestionarioService', () => {
  let service: NuevoCuestionarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NuevoCuestionarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
