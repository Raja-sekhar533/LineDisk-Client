import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationsuiComponent } from './notificationsui.component';

describe('NotificationsuiComponent', () => {
  let component: NotificationsuiComponent;
  let fixture: ComponentFixture<NotificationsuiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotificationsuiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationsuiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
