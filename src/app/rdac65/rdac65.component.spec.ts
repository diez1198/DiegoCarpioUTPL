import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Rdac65Component } from './rdac65.component';

describe('Rdac65Component', () => {
  let component: Rdac65Component;
  let fixture: ComponentFixture<Rdac65Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Rdac65Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Rdac65Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
