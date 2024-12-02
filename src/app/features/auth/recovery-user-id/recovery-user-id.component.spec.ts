import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecoveryUserIdComponent } from './recovery-user-id.component';

describe('RecoveryUserIdComponent', () => {
  let component: RecoveryUserIdComponent;
  let fixture: ComponentFixture<RecoveryUserIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecoveryUserIdComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecoveryUserIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
