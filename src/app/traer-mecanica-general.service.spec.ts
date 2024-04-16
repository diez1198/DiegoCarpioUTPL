import { TestBed } from '@angular/core/testing';

import { TraerMecanicaGeneralService } from './traer-mecanica-general.service';

describe('TraerMecanicaGeneralService', () => {
  let service: TraerMecanicaGeneralService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TraerMecanicaGeneralService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
