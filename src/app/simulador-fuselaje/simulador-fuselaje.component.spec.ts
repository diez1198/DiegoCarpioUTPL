import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimuladorFuselajeComponent } from './simulador-fuselaje.component';

describe('SimuladorFuselajeComponent', () => {
  let component: SimuladorFuselajeComponent;
  let fixture: ComponentFixture<SimuladorFuselajeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SimuladorFuselajeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SimuladorFuselajeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
