import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisteredAthletesComponent } from './registered-athletes.component';

describe('RegisteredAthletesComponent', () => {
  let component: RegisteredAthletesComponent;
  let fixture: ComponentFixture<RegisteredAthletesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisteredAthletesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegisteredAthletesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
