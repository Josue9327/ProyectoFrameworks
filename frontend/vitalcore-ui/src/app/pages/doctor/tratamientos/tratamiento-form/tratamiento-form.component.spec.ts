import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TratamientoFormComponent } from './tratamiento-form.component';

describe('TratamientoFormComponent', () => {
  let component: TratamientoFormComponent;
  let fixture: ComponentFixture<TratamientoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TratamientoFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TratamientoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
