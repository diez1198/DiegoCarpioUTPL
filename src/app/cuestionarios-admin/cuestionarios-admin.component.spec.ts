import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuestionariosAdminComponent } from './cuestionarios-admin.component';

describe('CuestionariosAdminComponent', () => {
  let component: CuestionariosAdminComponent;
  let fixture: ComponentFixture<CuestionariosAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CuestionariosAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CuestionariosAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
