import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimuladoresAdminComponent } from './simuladores-admin.component';

describe('SimuladoresAdminComponent', () => {
  let component: SimuladoresAdminComponent;
  let fixture: ComponentFixture<SimuladoresAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SimuladoresAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SimuladoresAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
