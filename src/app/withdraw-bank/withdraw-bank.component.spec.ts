import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WithdrawBankComponent } from './withdraw-bank.component';

describe('WithdrawBankComponent', () => {
  let component: WithdrawBankComponent;
  let fixture: ComponentFixture<WithdrawBankComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WithdrawBankComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WithdrawBankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
