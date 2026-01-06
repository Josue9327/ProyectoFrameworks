import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PacienteRecetasComponent } from './paciente-recetas.component';

describe('PacienteRecetasComponent', () => {
  let component: PacienteRecetasComponent;
  let fixture: ComponentFixture<PacienteRecetasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PacienteRecetasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PacienteRecetasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
