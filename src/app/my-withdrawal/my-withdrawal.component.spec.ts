import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyWithdrawalComponent } from './my-withdrawal.component';

describe('MyWithdrawalComponent', () => {
  let component: MyWithdrawalComponent;
  let fixture: ComponentFixture<MyWithdrawalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyWithdrawalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyWithdrawalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
