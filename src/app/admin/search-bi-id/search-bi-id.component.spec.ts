import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchBiIdComponent } from './search-bi-id.component';

describe('SearchBiIdComponent', () => {
  let component: SearchBiIdComponent;
  let fixture: ComponentFixture<SearchBiIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchBiIdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchBiIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
