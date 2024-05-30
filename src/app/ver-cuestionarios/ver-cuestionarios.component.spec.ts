import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerCuestionariosComponent } from './ver-cuestionarios.component';

describe('VerCuestionariosComponent', () => {
  let component: VerCuestionariosComponent;
  let fixture: ComponentFixture<VerCuestionariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerCuestionariosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerCuestionariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
