import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuestionarioFuselajeComponent } from './cuestionario-fuselaje.component';

describe('CuestionarioFuselajeComponent', () => {
  let component: CuestionarioFuselajeComponent;
  let fixture: ComponentFixture<CuestionarioFuselajeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CuestionarioFuselajeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CuestionarioFuselajeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
