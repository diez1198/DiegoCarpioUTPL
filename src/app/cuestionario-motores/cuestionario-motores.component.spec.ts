import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuestionarioMotoresComponent } from './cuestionario-motores.component';

describe('CuestionarioMotoresComponent', () => {
  let component: CuestionarioMotoresComponent;
  let fixture: ComponentFixture<CuestionarioMotoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CuestionarioMotoresComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CuestionarioMotoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
