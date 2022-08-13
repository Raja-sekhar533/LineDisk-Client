import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageECPMSComponent } from './manage-e-cpms.component';

describe('ManageECPMSComponent', () => {
  let component: ManageECPMSComponent;
  let fixture: ComponentFixture<ManageECPMSComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageECPMSComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageECPMSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
