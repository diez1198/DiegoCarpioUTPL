import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimuladorMecanicaGeneralComponent } from './simulador-mecanica-general.component';

describe('SimuladorMecanicaGeneralComponent', () => {
  let component: SimuladorMecanicaGeneralComponent;
  let fixture: ComponentFixture<SimuladorMecanicaGeneralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SimuladorMecanicaGeneralComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SimuladorMecanicaGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
