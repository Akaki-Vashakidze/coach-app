import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecoveryContactComponent } from './recovery-contact.component';

describe('RecoveryContactComponent', () => {
  let component: RecoveryContactComponent;
  let fixture: ComponentFixture<RecoveryContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecoveryContactComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecoveryContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
