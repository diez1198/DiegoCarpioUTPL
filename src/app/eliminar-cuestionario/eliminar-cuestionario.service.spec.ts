import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EliminarCuestionarioComponent } from './eliminar-cuestionario.component';


describe('EliminarCuestionarioComponent', () => {
  let component: EliminarCuestionarioComponent;
  let fixture: ComponentFixture<EliminarCuestionarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({

    
    declarations: [ EliminarCuestionarioComponent ]
  })
  .compileComponents();

  
  fixture = TestBed.createComponent(EliminarCuestionarioComponent);
  component = fixture.componentInstance;
  fixture.detectChanges();
});

  it('should created', () => {
    expect(component).toBeTruthy();
  });
});








