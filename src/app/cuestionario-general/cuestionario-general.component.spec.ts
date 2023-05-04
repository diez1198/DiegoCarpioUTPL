import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { CuestionarioGeneralComponent } from './cuestionario-general.component';

describe('CuestionarioGeneralComponent', () => {
  let component: CuestionarioGeneralComponent;
  let fixture: ComponentFixture<CuestionarioGeneralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CuestionarioGeneralComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CuestionarioGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
