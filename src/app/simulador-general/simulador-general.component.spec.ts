import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimuladorGeneralComponent } from './simulador-general.component';

describe('SimuladorGeneralComponent', () => {
  let component: SimuladorGeneralComponent;
  let fixture: ComponentFixture<SimuladorGeneralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SimuladorGeneralComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SimuladorGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
