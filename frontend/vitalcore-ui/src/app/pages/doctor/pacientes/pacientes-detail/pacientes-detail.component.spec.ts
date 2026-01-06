import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PacientesDetailComponent } from './pacientes-detail.component';

describe('PacientesDetailComponent', () => {
  let component: PacientesDetailComponent;
  let fixture: ComponentFixture<PacientesDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PacientesDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PacientesDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
