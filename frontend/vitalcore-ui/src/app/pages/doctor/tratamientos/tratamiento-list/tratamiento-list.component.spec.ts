import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TratamientoListComponent } from './tratamiento-list.component';

describe('TratamientoListComponent', () => {
  let component: TratamientoListComponent;
  let fixture: ComponentFixture<TratamientoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TratamientoListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TratamientoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
