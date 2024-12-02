import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignInConfirmComponent } from './sign-in-confirm.component';

describe('SignInConfirmComponent', () => {
  let component: SignInConfirmComponent;
  let fixture: ComponentFixture<SignInConfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignInConfirmComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SignInConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
