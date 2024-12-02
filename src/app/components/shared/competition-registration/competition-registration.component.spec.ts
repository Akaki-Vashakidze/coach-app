import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetitionRegistrationComponent } from './competition-registration.component';

describe('CompetitionRegistrationComponent', () => {
  let component: CompetitionRegistrationComponent;
  let fixture: ComponentFixture<CompetitionRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompetitionRegistrationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CompetitionRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
