import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPassRecoveryComponent } from './new-pass-recovery.component';

describe('NewPassRecoveryComponent', () => {
  let component: NewPassRecoveryComponent;
  let fixture: ComponentFixture<NewPassRecoveryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewPassRecoveryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewPassRecoveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
