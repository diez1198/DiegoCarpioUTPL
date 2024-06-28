import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimuladorMotoresComponent } from './simulador-motores.component';

describe('SimuladorMotoresComponent', () => {
  let component: SimuladorMotoresComponent;
  let fixture: ComponentFixture<SimuladorMotoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SimuladorMotoresComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SimuladorMotoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
